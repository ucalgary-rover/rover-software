
import React from "react";
import "./vehiclehealth.css";

class VehicleHealth extends React.Component{
render(){
    return(
      <div className= "rectangle">
      
  
      <h1 style={{fontFamily: "Monospace", font: "Lucida Console", textAlign:"center", textDecorationLine: "underline", fontSize: 40}}>Vehicle Conditions</h1>
    
      <div className="columns"> {/*Start of columns*/}
      <div className="column">
      <h2 className= "minirectangle" style={{justifyContent:"center", padding:20}}> Battery Voltage: 0 </h2>
      </div>
  
      <div className="column">
      <h2 className= "minirectangle" style={{justifyContent:"center", padding:20}}>Motor Speed: 0</h2>
      
      </div>
      </div> {/*End of columns*/}
  
      <div className="columns"> {/*Start of columns*/}
      <div className="column">
      <h2 className= "minirectangle" style={{justifyContent:"center", padding:20}}>Other Condition: 0</h2>
      </div>
     
  
      <div className="column">
      <h2 className= "minirectangle" style={{justifyContent:"center", padding:20}}>Other Condition: 0</h2>
     
      </div>
      </div> {/*End of columns*/}
      
    
      </div> 
    );
    }
}

export default VehicleHealth;