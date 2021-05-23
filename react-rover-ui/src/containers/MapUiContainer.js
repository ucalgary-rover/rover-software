import React from "react";
import { MapView } from "../components/MapView";
import { ControlPanel } from "../components/ControlPanel";
import { VideoStream } from "../components/VideoStream";

export class MapUiContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ height: "100%", width: "100%", display: "inline-block" }}>
        <MapView
          defaultCenter={this.props.launchConsts.mapCenter}
          mapTileDirectory={this.props.launchConsts.mapTileDirectory}
          mapInteraction={this.props.mapInteraction}
        />
      </div>
    );
  }
}
