import "./App.css";
import { launchConsts } from "./setup/LaunchConsts";
import { MapUiContainer } from "./containers/MapUiContainer";

function App() {
  return <div className="primary-container">
    <div className="data-column"></div>
    <div className="map-view"><MapUiContainer launchConsts={launchConsts}/></div>
    <div className="video-feed-a"></div>
    <div className="video-feed-b"></div>
    <div className="plan-panel"></div>
  </div>
}

export default App;
