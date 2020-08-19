# rover-software

## Setup
---

Open a terminal and follow the instructions below:

Ensure you are running **Ubuntu 18.04 bionic** with the command
```
lsb_release -a
``` 

#### The next steps summarize the install guide on the [ROS Webiste](http://wiki.ros.org/melodic/Installation/Ubuntu)

Setup your computer to accept software from packages.ros.org. 
```
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
```

Add Keys
```
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
```

Make sure your Debian package index is up-to-date
```
sudo apt update
```

Install ROS Desktop-FUll
```
sudo apt install ros-melodic-desktop-full
```

Automatically add ROS environment variables to any new shell
```
echo "source /opt/ros/melodic/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

Install all necessary dependencies
```
sudo apt install python-rosdep python-rosinstall python-rosinstall-generator python-wstool build-essential
```

Initialize rosdep
```
sudo apt install python-rosdep
sudo rosdep init
rosdep update
```

### Rover Team Specific steps

Clone the repository to your computer with
```
git clone https://github.com/ucalgary-rover/rover-software.git
```

If you intend to work on a new feature, create and checkout a branch with
```
git checkout -b <new-branch-name>
```

---

## Usage
---

### To get started, check out this [Beginner Guide](https://www.cse.sc.edu/~jokane/agitr/)

Make sure to run `roscore` in a terminal and leave the window open before starting to work on or test the code.

---

Created By: Derek Braun