import React, { Component } from 'react';
import ROSLIB from 'roslib';

import { MJPEGCANVAS } from '../../node_modules/mjpegcanvas/build/mjpegcanvas.js';

export class VideoStream extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var viewer = new MJPEGCANVAS.Viewer({
      divID : 'mjpeg',
      host : 'localhost',
      width : 640,
      height : 480,
      topic : '/wide_stereo/left/image_color'
    });
  }

  render() {
    return (
      <div id='mjpeg'/>
    );
  }
}
