import React, { Component } from 'react';
import EventEmitter2 from 'eventemitter2';
import ROSLIB from 'roslib';

var ros = new ROSLIB.Ros({
  url : 'ws://localhost:9090'
});

ros.on('connection', function() {
  console.log('Connected to websocket server');
});

ros.on('error', function(error) {
  console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function() {
  console.log('Connection to websocket server closed.');
});

var listener = new ROSLIB.Topic({
  ros : ros,
  name : '/rover/gps_report',
  messageType: 'rover/GpsCoords'
});

listener.subscribe(function(message) {
  console.log('Received message on ' + listener.name + ': ' + message.latitude + " " + message.longitude);
});

export class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeMode: "Add Route",
    };
    this.changeRouteMode = this.changeRouteMode.bind(this);
  }

  render() {
    return (
      <button onClick={this.changeRouteMode}>{this.state.routeMode}</button>
    );
  }
  changeRouteMode() {
    let newRouteMode =
      this.state.routeMode === "Add Route" ? "Complete Route" : "Add Route";
    let newUserMode = this.state.routeMode === "Add Route" ? "add" : "view";
    this.setState({ routeMode: newRouteMode });
    this.props.changeUserMode(newUserMode);
  }
}
