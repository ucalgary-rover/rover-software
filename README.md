# SSRT Rover Software Repository

## Running The Software

**Start ROS on the Rover**
1. Start ROS in a terminal window by running `$ roscore`
2. Run the Rover launch file in a new terminal tab `$roslaunch rover rover.launch`

**Start ROS on the Base Station**
1. Run the Base Station launch file in a new terminal tab `$roslaunch rover station.launch`

**Start the UI**
1. Navigate to the `rover-software` directory and run `$ bash LaunchUI.sh`
2. A browser tab should open by default, however if it does not, you can enter `localhost:3000` into the search bar of any browser. Note it seems that subscribing to a video feed doesn't work consistently on firefox when using a VM, however Chromium (the lightweight version of Chrome) appears to work fine.