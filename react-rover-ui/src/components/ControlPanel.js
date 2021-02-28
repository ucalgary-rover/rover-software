import React, { Component } from "react";

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
      <div>
        <button onClick={this.changeRouteMode}>{this.state.routeMode}</button>
      </div>
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
