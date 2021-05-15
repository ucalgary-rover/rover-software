import "../style/VehicleHealth.css"
import React, { Component } from 'react';
import ROSLIB from 'roslib';

export class VehicleHealth extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
		<div>
            <h4 style={{paddingLeft: "12px"}}>Vehicle Health</h4>
            <center>
                <table>
                    <tr>
                        <th>Field</th>
                        <th>Value</th>
                    </tr>
                    <tr>
                        <td>field a</td>
                        <td>Type</td>
                    </tr>
                    <tr>
                        <td>field c</td>
                        <td>9999</td>
                    </tr>
                    <tr>
                        <td>field d</td>
                        <td>Type</td>
                    </tr>
                    <tr>
                        <td>field e</td>
                        <td>9999</td>
                    </tr>
                    <tr>
                        <td>field f</td>
                        <td>Type</td>
                    </tr>
                    <tr>
                        <td>field g</td>
                        <td>9999</td>
                    </tr>
                </table>
            </center>
        </div>
    );
  }
}
