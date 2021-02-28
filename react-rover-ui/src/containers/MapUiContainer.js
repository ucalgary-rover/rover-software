import React from "react";
import { MapView } from "../components/MapView";
import { ControlPanel } from "../components/ControlPanel";

export class MapUiContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userMode: "view" };
    this.changeUserMode = this.changeUserMode.bind(this);
  }
  render() {
    return (
      <div>
        <MapView
          defaultCenter={this.props.launchConsts.mapCenter}
          mapTileDirectory={this.props.launchConsts.mapTileDirectory}
          userMode={this.state.userMode}
        />
        <ControlPanel changeUserMode={this.changeUserMode} />
      </div>
    );
  }
  changeUserMode(mode) {
    this.setState({ userMode: mode });
    console.log(mode);
  }
}
