import "./App.css";
import { launchConsts } from "./setup/LaunchConsts";
import { MapUiContainer } from "./containers/MapUiContainer";
import { VideoStream } from "./components/VideoStream";

function App() {
  return <div className="primary-container">
    <div className="data-column"></div>
    <div className="map-view"><MapUiContainer launchConsts={launchConsts}/></div>
    <div className="video-feed-a"><VideoStream /></div>
    <div className="video-feed-b"><VideoStream /></div>
    <div className="plan-panel"></div>
    <div className="control-panel"></div>
  </div>
}

export default App;
