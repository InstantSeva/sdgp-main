import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MeetOurTeam from "./components/MeetOurTeam";
import ContactUs from "./components/ContactUs";
import TechStack from "./components/TechStack";

function App() {
  return (
    <div className="App">
      
        <MeetOurTeam/>
        <TechStack/>
        <ContactUs/>
     
    </div>
  );
}

export default App;
