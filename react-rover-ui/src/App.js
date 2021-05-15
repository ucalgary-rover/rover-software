import "./style/App.css";
import { launchConsts } from "./setup/LaunchConsts";
import { MapUiContainer } from "./containers/MapUiContainer";
import { VideoStream } from "./components/VideoStream";
import { MultiVideoStream } from "./components/MultiVideoStream";
import { VehicleHealth } from "./components/VehicleHealth";

function App() {
  return <div className="primary-container">
    <div className="data-panel">
      <div className="data-container">
        <div className="connections"></div>
        <div className="vehicle-health"><VehicleHealth /></div>
      </div>
    </div>
    <div className="map-view"><MapUiContainer launchConsts={launchConsts}/></div>
    <div className="video-feed-a"><VideoStream selection="front"/></div>
    <div className="video-feed-b"><MultiVideoStream/></div>
    <div className="plan-panel"></div>
    <div className="control-panel"></div>
  </div>
}

export default App;
