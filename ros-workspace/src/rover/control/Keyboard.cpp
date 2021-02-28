#include <ros/ros.h>

#include <stdio.h>
#include <rover/DriveControls.h>

namespace
{
	const int KEY_UP = 'w';
	const int KEY_DOWN = 's';
	const int KEY_LEFT = 'a';
	const int KEY_RIGHT = 'd';
}

int main(int argc, char **argv)
{
	ros::init(argc, argv, "keyboard_control");
	ros::NodeHandle nh;

	ros::Publisher pub = nh.advertise<rover::DriveControls>(
		"rover/drive_control", 1000);

	char input = 0;
	rover::DriveControls msg;

	ros::Rate rate(1);
	while(ros::ok())
	{
		switch((input = getchar()))
		{
			case KEY_UP:
				ROS_INFO_STREAM("Commanding North");
				msg.linear.y = 20;
				msg.linear.x = 0;
				break;
			case KEY_DOWN:
				ROS_INFO_STREAM("Commanding South");
				msg.linear.y = -20;
				msg.linear.x = 0;
				break;
			case KEY_LEFT:
				ROS_INFO_STREAM("Commanding West");
				msg.linear.y = 0;
				msg.linear.x = -20;
				break;
			case KEY_RIGHT:
				ROS_INFO_STREAM("Commanding East");
				msg.linear.y = 0;
				msg.linear.x = 20;
				break;
			default:
				ROS_INFO_STREAM("Invalid Command");
				msg.linear.y = 0;
				msg.linear.x = 0;
				break;
		}

		pub.publish(msg);

		rate.sleep();
	}	

	return 0;
}