import "./style/App.css";
import { launchConsts } from "./setup/LaunchConsts";
import { MapUiContainer } from "./containers/MapUiContainer";
import { VideoStream } from "./components/VideoStream";
import { MultiVideoStream } from "./components/MultiVideoStream";
import { VehicleHealth } from "./components/VehicleHealth";
import { ControlPanel } from "./components/ControlPanel";

var mapInteraction = {userMode: "view"};
let markerCoordinates = {long: null, lat: null}

function App() {
  return <div className="primary-container">
    <div className="data-panel">
      <div className="data-container">
        <div className="connections"></div>
        <div className="vehicle-health"><VehicleHealth /></div>
      </div>
    </div>
    <div className="map-view"><MapUiContainer launchConsts={launchConsts} markerCoordinates={markerCoordinates} mapInteraction={mapInteractionState}/></div>
    <div className="video-feed-a"><VideoStream selection="front"/></div>
    <div className="video-feed-b"><MultiVideoStream/></div>
    <div className="plan-panel"><ControlPanel addMarker ={addMarker} changeUserMode={changeUserMode}/></div>
    <div className="control-panel"></div>
  </div>
}

function changeUserMode(mode) {
  mapInteraction.userMode = mode;
  console.log(mapInteraction.userMode);
}

function addMarker(newCoordinate){
  markerCoordinates = newCoordinate;
  console.log(newCoordinate);
}

function mapInteractionState() {
  return mapInteraction;
}

export default App;
