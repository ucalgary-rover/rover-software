import "./App.css";
import { launchConsts } from "./setup/LaunchConsts";
import { MapUiContainer } from "./containers/MapUiContainer";

function App() {
  return (
    <div className="App">
      <MapUiContainer launchConsts={launchConsts} />
    </div>
  );
}

export default App;

// I made a change
