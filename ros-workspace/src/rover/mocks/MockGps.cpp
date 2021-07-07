// Simulates periodic gps location messages

#include <ros/ros.h>
#include <math.h>
#include <rover/GpsCoords.h>
#include <stdlib.h>
#include <string>
#include <sensor_msgs/Joy.h>

double joyAxes[8];

void joyStickCallBack (const sensor_msgs::Joy& msg){
	
	ROS_INFO_STREAM("In Callback");

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

	/*double latDisplacment= (((float)rand()-RAND_MAX/2)/(float)(RAND_MAX/3.0));  //for constanst random speed
	double lonDisplacment= (((float)rand()-RAND_MAX/2)/(float)(RAND_MAX/3.0));*/
	
	while(ros::ok())
	{
		rover::GpsCoords msg;

		msg.header.stamp = ros::Time::now();

		/*double latDisplacment= (((float)rand()-RAND_MAX/2)/(float)(RAND_MAX/3.0)); // for random speed
		double lonDisplacment= (((float)rand()-RAND_MAX/2)/(float)(RAND_MAX/3.0));*/
		
		double latDisplacment;
		double lonDisplacment;
		
		for (int i=0; i<=7; i++)
		{

			if (i==1 || i==4|| i==7)
			{
				latDisplacment= (joyAxes[i]);
			}

			if (i==0 || i==3 || i==6)
			{
				lonDisplacment= -(joyAxes[i]);
			}

		}
		
		msg.latitude= previousLat;
		msg.longitude= previousLon;
		
		previousLat +=  latDisplacment;
		previousLon += lonDisplacment;

		msg.ground_speed = sqrt(pow(latDisplacment,2)+ pow(lonDisplacment,2));

		if (msg.latitude>0 && msg.longitude>0)
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
		}

		pub.publish(msg);


		ROS_INFO_STREAM("Got Parameters: " << latParam << ", " << lonParam);
		
		ros::spinOnce();
		rate.sleep();
	}
	
	return 0;
}