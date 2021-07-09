// Simulates periodic gps location messages

#include <ros/ros.h>
#include <math.h>
#include <rover/GpsCoords.h>
#include <stdlib.h>
#include <string>
#include <sensor_msgs/Joy.h>

double joyAxes[8];

void joyStickCallBack (const sensor_msgs::Joy& msg){
	
	for (int i=0; i<=7; i++)
	{
	joyAxes[i]=msg.axes[i];
	}
}

int main(int argc, char **argv)
{
	ros::init(argc, argv, "mock_gps");
	ros::NodeHandle nh("~");

	ros::Publisher pub = nh.advertise<rover::GpsCoords>(
		"rover/gps_report", 1000);

	ros::Subscriber sub = nh.subscribe("/joyDrive",1000,joyStickCallBack);

	double latParam = 0;
	double lonParam = 0;
	
	nh.getParam("lat", latParam);
	nh.getParam("lon", lonParam);

	srand(time(0));

	ros::Rate rate(5);

	double previousLat=latParam;
	double previousLon=lonParam;

	while(ros::ok())
	{
		rover::GpsCoords msg;

		msg.header.stamp = ros::Time::now();
		
		double latDisplacment;
		double lonDisplacment;
		
		for (int i=0; i<=7; i++)
		{

			if ((i == 1 && joyAxes[i] != 0) || (i == 4 && joyAxes[i] != 0)|| (i == 7 && joyAxes[i] != 0))
			{
				latDisplacment= joyAxes[i];
			}

			if ((i == 0 && joyAxes[i] != 0) || (i == 3 && joyAxes[i] != 0)|| (i == 6 && joyAxes[i] != 0))
			{
				lonDisplacment= -joyAxes[i];
			}

		}
		
		msg.latitude = previousLat;
		msg.longitude = previousLon;
		
		previousLat +=  latDisplacment;
		previousLon += lonDisplacment;

		msg.ground_speed = sqrt(pow(latDisplacment, 2)+ pow(lonDisplacment, 2));

		if (msg.latitude > 0 && msg.longitude > 0)
		{
			msg.direction = "NE";
		} 
		else if (msg.latitude < 0 && msg.longitude > 0)
		{
			msg.direction = "SE";
		}
		else if (msg.latitude < 0 && msg.longitude < 0)	
		{
			msg.direction = "SW";
		}
		else if (msg.latitude > 0 && msg.longitude <0 )
		{
			msg.direction = "NW";
		}
		else
		{
			msg.direction = "invalid";
		}

		pub.publish(msg);

		
		ros::spinOnce();
		rate.sleep();
	}
	
	return 0;
}