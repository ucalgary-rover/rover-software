// ROS Hello World program left in for education purposes

// This header defines the standard ROS classes
#include <ros/ros.h>

int main(int argc, char **argv)
{
	// Initialize the ROS system
	ros::init(argc, argv, "hello_ros");

	// Establish this program as a ROS node
	ros::NodeHandle nh;

	// Send some output as a log message
	ROS_INFO_STREAM("Hello SSRT");

	return 0;
}