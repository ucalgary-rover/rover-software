#include <ros/ros.h>

#include <rover/GpsCoords.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <termios.h>
#include <time.h>
#include <stdlib.h>

int hex2int(char *c);
int checksum_valid(char *string);
int parse_comma_delimited_str(char *string, char **fields, int max_fields);
int debug_print_fields(int numfields, char **fields);
int openGPSPort(const char *devname);
int setTime(char *date, char *time);
float gpsToDecimalDegrees(const char* nmeaPos, char* quadrant);

int main(int argc, char **argv)
{
	int fd;
	char buffer[255];
	int nbytes;
	int i;
	char *field[20];

	ros::init(argc, argv, "gps_service");
	ros::NodeHandle nh;

	ros::Publisher pub = nh.advertise<rover::GpsCoords>(
		"rover/gps_report", 1000);

	ros::Rate rate(10);

	if ((fd = openGPSPort("/dev/ttyACM1")) < 0)
	{
		printf("Cannot open GPS port\r\n.");
		return 0;
	}

	do {
		if ((nbytes = read(fd, &buffer, sizeof(buffer))) < 0) {
			perror("Read");
			return 1;
		} else {
			if (nbytes == 0) {
				rover::GpsCoords msg;

				msg.header.stamp = ros::Time::now();
				msg.valid = false;

				pub.publish(msg);
				sleep(1);

			} else {
				buffer[nbytes - 1] = '\0';
				if (checksum_valid(buffer)) {
					if ((strncmp(buffer, "$GP", 3) == 0) |
						(strncmp(buffer, "$GN", 3) == 0)) {

						if (strncmp(&buffer[3], "GGA", 3) == 0) {
							parse_comma_delimited_str(buffer, field, 20);

							rover::GpsCoords msg;

							msg.header.stamp = ros::Time::now();
							msg.valid = true;

							msg.latitude = gpsToDecimalDegrees(field[2], field[3]);
							msg.longitude = gpsToDecimalDegrees(field[4], field[5]);
							msg.altitude = atof(field[9]);
							msg.satellites = atoi(field[7]);

							pub.publish(msg);
							printf("Buffer String :%s\r\n", buffer);
						}
						if (strncmp(&buffer[3], "RMC", 3) == 0) {
							i = parse_comma_delimited_str(buffer, field, 20);

							rover::GpsCoords msg;

							msg.header.stamp = ros::Time::now();
							msg.valid = true;

							msg.ground_speed = atof(field[7]);

							pub.publish(msg);
						}
					}
				}
			}
		}
		rate.sleep();
	} while(ros::ok());

	if (close(fd) < 0) {
		perror("Close");
		return 1;
	}

	return (0);
}

int debug_print_fields(int numfields, char **fields)
{
	printf("Parsed %d fields\r\n",numfields);

	for (int i = 0; i <= numfields; i++) {
		printf("Field %02d: [%s]\r\n",i,fields[i]);
	}
}

int hexchar2int(char c)
{
    if (c >= '0' && c <= '9')
        return c - '0';
    if (c >= 'A' && c <= 'F')
        return c - 'A' + 10;
    if (c >= 'a' && c <= 'f')
        return c - 'a' + 10;
    return -1;
}

int hex2int(char *c)
{
	int value;

	value = hexchar2int(c[0]);
	value = value << 4;
	value += hexchar2int(c[1]);

	return value;
}

int checksum_valid(char *string)
{
	char *checksum_str;
	int checksum;
	unsigned char calculated_checksum = 0;

	// Checksum is postcede by *
	checksum_str = strchr(string, '*');
	if (checksum_str != NULL){
		// Remove checksum from string
		*checksum_str = '\0';
		// Calculate checksum, starting after $ (i = 1)
		for (int i = 1; i < strlen(string); i++) {
			calculated_checksum = calculated_checksum ^ string[i];
		}
		checksum = hex2int((char *)checksum_str+1);
		//printf("Checksum Str [%s], Checksum %02X, Calculated Checksum %02X\r\n",(char *)checksum_str+1, checksum, calculated_checksum);
		if (checksum == calculated_checksum) {
			//printf("Checksum OK");
			return 1;
		}
	} else {
		//printf("Error: Checksum missing or NULL NMEA message\r\n");
		return 0;
	}
	return 0;
}

int parse_comma_delimited_str(char *string, char **fields, int max_fields)
{
	int i = 0;
	fields[i++] = string;

	while ((i < max_fields) && NULL != (string = strchr(string, ','))) {
		*string = '\0';
		fields[i++] = ++string;
	}

	return --i;
}

int openGPSPort(const char *devname)
{
	int fd;
	struct termios options;

	if ((fd = open(devname, O_RDWR | O_NOCTTY | O_NDELAY)) < 0) {
		perror("Open");
		return 1;
	}

	// Set to blocking
	fcntl(fd, F_SETFL, 0);

	// Get port attributes
	tcgetattr(fd, &options);

	// Set input and output baud rates
	cfsetispeed(&options, B460800);
	cfsetospeed(&options, B460800);

	// Set input modes
	options.c_iflag |= ICRNL;

	// Set 8 bits, no parity, 1 stop bit
	options.c_cflag &= ~PARENB;
	options.c_cflag &= ~CSTOPB;
	options.c_cflag &= ~CSIZE;
	options.c_cflag |= CS8;

	options.c_lflag &= ~ECHO;
	options.c_lflag |= ICANON;

	// Set port attributes
	tcsetattr(fd, TCSAFLUSH, &options);

	return(fd);
}

float gpsToDecimalDegrees(const char* nmeaPos, char* quadrant)
{
  float v= 0;
  if(strlen(nmeaPos)>5)
  {
    char integerPart[3+1];
    int digitCount= (nmeaPos[4]=='.' ? 2 : 3);
    memcpy(integerPart, nmeaPos, digitCount);
    integerPart[digitCount]= 0;
    nmeaPos+= digitCount;
    v= atoi(integerPart) + atof(nmeaPos)/60.;
    if(!strcmp(quadrant, "W") || !strcmp(quadrant, "S"))
      v= -v;
  }
  return v;
}

