// Simulates periodic motor status messages

#include <ros/ros.h>

#include <rover/MotorState.h>
#include <stdlib.h>

int main(int argc, char **argv)
{
	ros::init(argc, argv, "mock_gps");
	ros::NodeHandle nh;

	ros::Publisher pub = nh.advertise<rover::MotorState>(
		"rover/motor_report", 1000);

	srand(time(0));

	ros::Rate rate(1);
	while(ros::ok())
	{
		rover::MotorState msg;

		msg.header.stamp = ros::Time::now();

		msg.vel_m1 = double(rand());
		msg.vel_m2 = double(rand());
		msg.vel_m3 = double(rand());
		msg.vel_m4 = double(rand());
		msg.vel_m5 = double(rand());
		msg.vel_m6 = double(rand());

		pub.publish(msg);

		ROS_INFO_STREAM("Reported Motor State:" 
			<< " m1: " 
			<< msg.vel_m1
			<< " m2: "
			<< msg.vel_m2
			<< " m3: " 
			<< msg.vel_m3
			<< " m4: " 
			<< msg.vel_m4
			<< " m5: " 
			<< msg.vel_m5
			<< " m6: " 
			<< msg.vel_m6);

		rate.sleep();
	}

	return 0;
}