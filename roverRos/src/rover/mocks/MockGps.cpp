// Simulates periodic gps location messages

#include <ros/ros.h>

#include <rover/GpsCoords.h>
#include <stdlib.h>

int main(int argc, char **argv)
{
	ros::init(argc, argv, "mock_gps");
	ros::NodeHandle nh;

	ros::Publisher pub = nh.advertise<rover::GpsCoords>(
		"rover/gps_report", 1000);

	srand(time(0));

	ros::Rate rate(1);
	while(ros::ok())
	{
		rover::GpsCoords msg;

		msg.header.stamp = ros::Time::now();

		msg.lat = double(rand());
		msg.lon = double(rand());

		pub.publish(msg);

		ROS_INFO_STREAM("Reported GPS:" 
			<< " lat: " 
			<< msg.lat
			<< " lon: "
			<< msg.lon);

		rate.sleep();
	}

	return 0;
}