import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import roverIcon from "../img/rover-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 40],
  shadowAnchor: [12, 40],
});



let RoverIcon = L.icon({
  iconUrl: roverIcon,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

L.Marker.prototype.options.icon = DefaultIcon;

function ClickHandler(props) {
  useMapEvent({
    click(e) {
      if (props.mapInteraction.userMode === "view") {
        return;
      }
      props.addWaypoint(e.latlng);
    },
  });
  return null;
}

function drawPaths(waypoints) {
  let newPaths = [];
  if (waypoints.length < 2) {
    return [];
  }
  for (var i = 1; i < waypoints.length; i++) {
    let pathToAdd = [waypoints[i], waypoints[i - 1]];
    newPaths.push(pathToAdd);
  }
  return newPaths;
}

export function MapView(props){
  const [roverPosition, setRoverPosition] = useState(L.latLng(51.076672, -114.137474));
  const [waypoints, setWaypoints] = useState([roverPosition]);
  const [paths, setPaths] = useState([]);

  const popupButtonVisibility = props.mapInteraction.userMode === "edit" ? "visible": "hidden";

  function updateRoverPosition(newPosition){
    setRoverPosition(newPosition)
  }

  function addWaypoint(position) {
    let newWaypoints = waypoints;
    newWaypoints.push(position);
    props.changeWaypoints(newWaypoints)
    setWaypoints(newWaypoints);
    setPaths(drawPaths(waypoints));
  }

  function removeMarker(markersPosition){
    let newWaypoints = waypoints.filter(position => position != markersPosition);
    props.changeWaypoints(newWaypoints)
    setPaths(drawPaths(newWaypoints));
    setWaypoints(newWaypoints);
  }

  useEffect(() => {
    if(props.coordinateValues.lat !== null && props.coordinateValues.lng !== null && props.mapInteraction.userMode === "edit"){
      addWaypoint(L.latLng(props.coordinateValues.lat, props.coordinateValues.long));
    }
      
  }, [props.coordinateValues]);

   return (
      <MapContainer
        // onClick={this.handleClick}
        center={props.defaultCenter}
        zoom={17}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", display: "inline-block" }}
      >
        <ClickHandler
          mapInteraction={props.mapInteraction}
          addWaypoint={addWaypoint}
        />
        <TileLayer url={props.mapTileDirectory} />
        {waypoints.map((position, idx) => (
          <Marker key={`waypoint-${idx}`} position={position}>
            <Popup>
              <span>
                Waypoint {idx + 1}
                <br />
                Lat: {position.lat}
                <br />
                Lng: {position.lng}
              </span>
              <br/>
              <button style={{visibility: popupButtonVisibility}} onClick={() => removeMarker(position)}>Remove Marker From Path</button>
            </Popup>
          </Marker>
          ))}
        {paths.map((positions, idx) => (
          <Polyline
            key={`path-${idx}`}
            pathOptions={{ color: "lightBlue" }}
            positions={positions}
          />
        ))}
      </MapContainer>
    );
}