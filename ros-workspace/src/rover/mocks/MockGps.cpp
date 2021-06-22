// Simulates periodic gps location messages

#include <ros/ros.h>
#include <math.h>
#include <rover/GpsCoords.h>
#include <stdlib.h>

int main(int argc, char **argv)
{
	ros::init(argc, argv, "mock_gps");
	ros::NodeHandle nh("~");

	ros::Publisher pub = nh.advertise<rover::GpsCoords>(
		"rover/gps_report", 1000);

	double latParam = 0;
	double lonParam = 0;
	nh.getParam("lat", latParam);
	nh.getParam("lon", lonParam);

	srand(time(0));

	ros::Rate rate(1);


	double previousLat=latParam;
	double previousLon=lonParam;

	double latDisplacment= (((float)rand()-RAND_MAX/2)/(float)(RAND_MAX/3.0));  //for constanst speed
	double lonDisplacment= (((float)rand()-RAND_MAX/2)/(float)(RAND_MAX/3.0));
	
	while(ros::ok())
	{
		rover::GpsCoords msg;

		msg.header.stamp = ros::Time::now();

		//double latDisplacment= (((float)rand()-RAND_MAX/2)/(float)(RAND_MAX/3.0)); // for random speed
		//double lonDisplacment= (((float)rand()-RAND_MAX/2)/(float)(RAND_MAX/3.0));
		
		msg.latitude= previousLat;
		msg.longitude= previousLon;
		
		previousLat +=  latDisplacment;
		previousLon += lonDisplacment;

		msg.ground_speed = sqrt(pow(latDisplacment,2)+ pow(lonDisplacment,2));

		/*if (msg.latitude>0 && msg.longitude>0)
		{
			msg.direction = "NE";
		} else if (msg.latitude<0 && msg.longitude>0)
		{
			msg.direction = "SE";
		}else if (msg.latitude<0 && msg.longitude<0)			// needing to know how to access msg board
		{
			msg.direction = "SW";
		}else if (msg.latitude>0 && msg.longitude<0)
		{
			msg.direction = "NW";
		}*/

		pub.publish(msg);


		ROS_INFO_STREAM("Got Parameters: " << latParam << ", " << lonParam);

		rate.sleep();
	}

	return 0;
}