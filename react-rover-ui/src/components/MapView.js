import React, { Component } from "react";
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
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 40],
  shadowAnchor: [12, 40],
});

L.Marker.prototype.options.icon = DefaultIcon;

function ClickHandler(props) {
  useMapEvent({
    click(e) {
      if (props.mapInteraction().userMode === "view") {
        return;
      }
      props.addWaypoint(e.latlng);
    },
  });
  return null;
}

export class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waypoints: [],
      paths: [],
      roverPosition: L.latLng(51.076672, -114.137474),
    };
    this.addWaypoint = this.addWaypoint.bind(this);
    this.drawPaths = this.drawPaths.bind(this);
  }
  render() {
    return (
      <MapContainer
        onClick={this.handleClick}
        center={this.props.defaultCenter}
        zoom={17}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", display: "inline-block" }}
      >
        <ClickHandler
          mapInteraction={this.props.mapInteraction}
          addWaypoint={this.addWaypoint}
        />
        <TileLayer url={this.props.mapTileDirectory} />
        {this.state.waypoints.map((position, idx) => (
          <Marker key={`waypoint-${idx}`} position={position}>
            <Popup>
              <span>
                Waypoint {idx + 1}
                <br />
                Lat: {position.lat}
                <br />
                Lng: {position.lng}
              </span>
            </Popup>
          </Marker>
        ))}
        {this.state.paths.map((positions, idx) => (
          <Polyline
            key={`path-${idx}`}
            pathOptions={{ color: "lightBlue" }}
            positions={positions}
          />
        ))}
        <Marker position={this.state.roverPosition}></Marker>
      </MapContainer>
    );
  }
  addWaypoint(position) {
    const newWaypoints = this.state.waypoints;
    newWaypoints.push(position);
    this.setState({ waypoints: newWaypoints });
    this.drawPaths();
  }
  drawPaths() {
    let newPaths;
    if (this.state.waypoints.length < 2) {
      return;
    }
    for (var i = 1; i < this.state.waypoints.length; i++) {
      let pathToAdd = [this.state.waypoints[i], this.state.waypoints[i - 1]];
      newPaths = this.state.paths;
      newPaths.push(pathToAdd);
    }
    this.setState({ paths: newPaths });
  }
  updateRoverPosition(newPosition)
  {
    this.setState({ roverPosition: newPosition})
  }
}
