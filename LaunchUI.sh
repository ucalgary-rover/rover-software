#!/bin/bash
#Launch the React UI and Express Image Server

gnome-terminal --tab -- bash -c 'cd express-image-server; npm start'
gnome-terminal --tab -- bash -c 'cd react-rover-ui; npm start'