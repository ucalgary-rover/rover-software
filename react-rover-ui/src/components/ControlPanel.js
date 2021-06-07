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
      routeMode: "Edit Route",
    };
    this.changeRouteMode = this.changeRouteMode.bind(this);
    this.addCoordinate = this.addCoordinate.bind(this);
  }

  render() {
    const visibility = this.state.routeMode === "Edit Route" ? "hidden": "visible";

    return (
    <div>
      <button onClick={this.changeRouteMode}>{this.state.routeMode}</button><br/>

      <form style={{visibility: visibility}}  onSubmit={this.addCoordinate}>
        <label for="longitude">Longitude:</label>
        <input type="number" step="any" id="longitude" name="longitude" ></input>
        <br></br>
        <label for="latitude">latitude:</label>
        <input type="number" step="any" id="latitude" name="latitude"></input>
        <br></br>
        <input type="submit" value="Add Coordinate"></input>
      </form>

      <div style={{ overflow: "scroll", display: "inline-block"}}>
        {this.props.waypoints.map((coordinate, idx) => (
          <div style={{fontSize: "14px"}} >
            <span>
              <strong>Point#:</strong> {idx+1},
              <strong>   Longitude:</strong> {coordinate.lng},
              <strong>   Latitude:</strong> {coordinate.lat}
            </span><br/>
          </div>
        ))}
      </div>
    </div> 
    );
  }

  addCoordinate(event){
    event.preventDefault();
    if(event.target.longitude.value !== "" && event.target.latitude.value !== ""){
      const newCoordinate = {long: event.target.longitude.value, lat: event.target.latitude.value};
      this.props.addMarker(newCoordinate);
      event.target.longitude.value = "";
      event.target.latitude.value = "";
    }
  }

  changeRouteMode() {
    let newRouteMode = this.state.routeMode === "Edit Route" ? "Finish Editing" : "Edit Route";
    let newUserMode = this.state.routeMode === "Edit Route" ? "edit" : "view";
    this.setState({ routeMode: newRouteMode });
    this.props.changeUserMode(newUserMode);
  }
}
