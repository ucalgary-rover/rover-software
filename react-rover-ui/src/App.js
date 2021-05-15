import "./App.css";
import { launchConsts } from "./setup/LaunchConsts";
import { MapUiContainer } from "./containers/MapUiContainer";
import { VideoStream } from "./components/VideoStream";
import { MultiVideoStream } from "./components/MultiVideoStream";

function App() {
  return <div className="primary-container">
    <div className="data-column"></div>
    <div className="map-view"><MapUiContainer launchConsts={launchConsts}/></div>
    <div className="video-feed-a"><VideoStream selection="front"/></div>
    <div className="video-feed-b"><MultiVideoStream/></div>
    <div className="plan-panel"></div>
    <div className="control-panel"></div>
  </div>
}

export default App;
