#include <ros/ros.h>

#include <rover/DriveControls.h>
#include <rover/GpsCoords.h>
#include <string>

namespace
{
	const float EARTH_RADIUS = 6371000;
	const float PI = 3.14159;
}

class SimGps
{
public:
	SimGps(double latitude, double longitude, ros::NodeHandle nh);
	~SimGps();

	void control(const rover::DriveControls& msg);

private:
	double latitude_;
	double longitude_;

	ros::Subscriber sub_;
	ros::Publisher pub_;

	int timeInterval_;
};

SimGps::SimGps(double latitude, double longitude, ros::NodeHandle nh) 
	: latitude_(latitude)
	, longitude_(longitude)
	, timeInterval_(1)
{
	ros::Subscriber sub_ = nh.subscribe("rover/drive_control", 1000, &SimGps::control, this);
	ROS_INFO_STREAM("Subscribed");
	ros::Publisher pub_ = nh.advertise<rover::GpsCoords>(
		"rover/current_location", 1000);
}

SimGps::~SimGps()
{
}

void SimGps::control(const rover::DriveControls& msg)
{
	ROS_INFO_STREAM("Hello");
	double finalLat = (((msg.linear.y * timeInterval_) / EARTH_RADIUS) + (latitude_ * (PI / 180))) / (PI / 180);
	double finalLong = (((msg.linear.x * timeInterval_) / EARTH_RADIUS) + (longitude_ * (PI / 180))) / (PI / 180);

	rover::GpsCoords currentCoords;

	currentCoords.latitude = finalLat;
	currentCoords.longitude = finalLong;

	ROS_INFO_STREAM("Latitude: " << currentCoords.latitude << " Longitude: " << currentCoords.longitude);
	pub_.publish(currentCoords);
}

int main(int argc, char **argv)
{
	ros::init(argc, argv, "gps_simulator");
	ros::NodeHandle nh;

	// TODO figure out command line arguments

	// std::string latParam;
	// std::string longParam;

	// nh.getParam("lat", latParam);
	// nh.getParam("long", longParam);

	// ROS_INFO_STREAM(latParam);

	// double initLat = std::stod(latParam);
	// double initLong = std::stod(longParam);

	SimGps simulator(51.0, -114.0, nh);

	ros::spin();

	return 0;
}