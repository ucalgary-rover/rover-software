import React, { Component, useState, useEffect } from 'react';
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

export function MapControlPanel(props){
  const [routeMode, setRouteMode] = useState("Edit Route")

  const visibility = routeMode === "Edit Route" ? "hidden": "visible";

  function addCoordinate(event){
    event.preventDefault();
    if(event.target.longitude.value !== "" && event.target.latitude.value !== ""){
      const newCoordinate = {long: event.target.longitude.value, lat: event.target.latitude.value};
      props.addMarker(newCoordinate);
      event.target.longitude.value = "";
      event.target.latitude.value = "";
    }
  }

  function changeRouteMode() {
    let newRouteMode = routeMode === "Edit Route" ? "Finish Editing" : "Edit Route";
    let newUserMode = routeMode === "Edit Route" ? "edit" : "view";
    setRouteMode(newRouteMode);
    props.changeUserMode(newUserMode);
  }

  return (
  <div>
    <button onClick={changeRouteMode}>{routeMode}</button><br/>

    <form style={{visibility: visibility}}  onSubmit={addCoordinate}>
      <label for="longitude">Longitude:</label>
      <input type="number" step="any" id="longitude" name="longitude" ></input>
      <br></br>
      <label for="latitude">latitude:</label>
      <input type="number" step="any" id="latitude" name="latitude"></input>
      <br></br>
      <input type="submit" value="Add Coordinate"></input>
    </form>

    {props.waypoints.map((coordinate, idx) => (
      <div style={{overflow: "auto", fontSize: "14px"}} >
        <span>
          <strong>Point#:</strong> {idx+1},
          <strong>   Longitude:</strong> {coordinate.lng},
          <strong>   Latitude:</strong> {coordinate.lat}
        </span><br/>
      </div>
    ))}
  </div> 
  );
  }
