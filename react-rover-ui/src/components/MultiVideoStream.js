import React, { Component } from 'react';
import ROSLIB from 'roslib';

import { MJPEGCANVAS } from '../mjpegcanvas/build/mjpegcanvas.js';

export class MultiVideoStream extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var viewer = new MJPEGCANVAS.MultiStreamViewer({
      divID : 'mjpeg',
      host : 'localhost',
      height : this.refs.child.parentNode.clientHeight,
      width : this.refs.child.parentNode.clientWidth,
      topics : ['/camera/image_raw', '/camera/image_raw/theora', 'topic', ''],
      labels : ['front', 'arm', 'science', 'none']
    });
  }

  render() {
    return (
		  <div id='mjpeg' ref="child" />
    );
  }
}
