import { useState, useEffect} from 'react';
import "./style/App.css";
import { launchConsts } from "./setup/LaunchConsts";
import { MapView } from "./components/MapView";
import { VideoStream } from "./components/VideoStream";
import { MultiVideoStream } from "./components/MultiVideoStream";
import { VehicleHealth } from "./components/VehicleHealth";
import { ControlPanel } from "./components/ControlPanel";

function App() {
  const [markerCoordinates, setMarkerCoordinates] = useState({lng: null, lat: null})
  const [mapInteraction, setMapInteraction] = useState({userMode: "view"})
  const [waypoints, setWaypoints] = useState([])

  function changeUserMode(mode) {
    setMapInteraction({userMode: mode})
    console.log(mapInteraction.userMode);
  }

  function addMarker(newCoordinate){
    setMarkerCoordinates(newCoordinate);
    console.log(newCoordinate);
  }

  function changeWaypoints(points) {
    if(points !== waypoints){
      console.log(points, waypoints);
      setWaypoints(points)
    }
  }

  useEffect(() => {
    console.log("waypoints updated")
  }, [waypoints])

  return (
  <div className="primary-container">
    <div className="data-panel">
      <div className="data-container">
        <div className="connections"></div>
        <div className="vehicle-health"><VehicleHealth /></div>
      </div>
    </div>
    <div className="map-view" style={{ height: "100%", width: "100%", display: "inline-block" }}>
        <MapView
          defaultCenter={launchConsts.mapCenter}
          mapTileDirectory={launchConsts.mapTileDirectory}
          mapInteraction={mapInteraction}
          coordinateValues={markerCoordinates}
          changeWaypoints={changeWaypoints}
        />
    </div>
    <div className="video-feed-a"><VideoStream selection="front"/></div>
    <div className="video-feed-b"><MultiVideoStream/></div>
    <div className="plan-panel"><ControlPanel addMarker ={addMarker} waypoints={waypoints} changeUserMode={changeUserMode}/></div>
    <div className="control-panel"></div>
  </div>)
}

export default App;
