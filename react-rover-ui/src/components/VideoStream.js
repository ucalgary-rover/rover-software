import React, { Component } from 'react';
import ROSLIB from 'roslib';
import { FormControl, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { MJPEGCANVAS } from '../mjpegcanvas/build/mjpegcanvas.js';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export class VideoStream extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	feedId: 1,
    };
  }

  componentDidMount() {
    var viewer = new MJPEGCANVAS.Viewer({
      divID : 'mjpeg',
      host : 'localhost',
      height : this.refs.child.parentNode.clientHeight,
      width : this.refs.child.parentNode.clientWidth,
      topic : '/wide_stereo/left/image_color'
    });
  }

  render() {
    return (
			  <div id='mjpeg' ref="child">
          <select style={{position: 'absolute', marginTop: '10px', marginLeft: '10px', paddingRight: '30px'}} name="feeds" id="feeds">
            <option value="front">Front</option>
            <option value="arm">Arm</option>
            <option value="science">Science</option>
            <option value="none">None</option>
          </select>
        </div>
    );
  }
}
