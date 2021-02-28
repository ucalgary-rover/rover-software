import "./App.css";
import { launchConsts } from "./setup/LaunchConsts";
import { MapUiContainer } from "./containers/MapUiContainer";
import VehicleHealth from "./components/VehicleHealth/VehicleHealth";


function App() {
  return (
    <div>
    <div className="App">
      <MapUiContainer launchConsts={launchConsts} />
    </div>
    <div>
      <VehicleHealth />
    </div>
  </div>

  );
}

export default App;

// I made a change
