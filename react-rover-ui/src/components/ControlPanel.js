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
      clearMarker: "Delete Markers"
    };
    this.changeRouteMode = this.changeRouteMode.bind(this);
    this.removeMarker = this.removeMarker.bind(this);
    this.addCoordinate = this.addCoordinate.bind(this);
  }

  render() {
    const visibility = this.state.routeMode === "Add Route" ? "hidden": "visible";

    return (
    <div>
      <button onClick={this.changeRouteMode}>{this.state.routeMode}</button>
      <button onClick={this.removeMarker}>{this.state.clearMarker}</button>
      <br></br>

      <form style={{visibility: visibility}}  onSubmit={this.addCoordinate}>
        <label for="longitude">Longitude:</label>
        <input type="number" step="any" id="longitude" name="longitude" ></input>
        <br></br>
        <label for="latitude">latitude:</label>
        <input type="number" step="any" id="latitude" name="latitude"></input>
        <br></br>
        <input type="submit" value="Add Coordinate"></input>
      </form>
    </div> 
    );
  }

  addCoordinate(event){
    event.preventDefault();

    const newCoordinate = {long: event.target.longitude.value, lat: event.target.latitude.value};
    this.props.addMarker(newCoordinate);
    event.target.longitude.value = "";
    event.target.latitude.value = "";
  }

  changeRouteMode() {
    let newRouteMode =
      this.state.routeMode === "Add Route" ? "Complete Route" : "Add Route";
    let newUserMode = this.state.routeMode === "Add Route" ? "add" : "view";
    this.setState({ routeMode: newRouteMode });
    this.props.changeUserMode(newUserMode);
  }

  removeMarker() {
    let newClearMarker =
      this.state.clearMarker === "Delete Markers" ? "Done Removing" : "Delete Markers";
    let newUserMode = this.state.clearMarker === "Delete Markers" ? "remove" : "view";
    this.setState({ clearMarker: newClearMarker });
    this.props.changeUserMode(newUserMode);
  }
}
