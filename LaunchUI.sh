#!/bin/bash
#Launch the React UI and Express Image Server

gnome-terminal --tab -- bash -c 'roscore'
gnome-terminal --tab -- bash -c 'roslaunch rosbridge_server rosbridge_websocket.launch'
gnome-terminal --tab -- bash -c 'cd express-image-server; npm start'
gnome-terminal --tab -- bash -c 'cd react-rover-ui; npm start'