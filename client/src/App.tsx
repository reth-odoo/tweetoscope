import React from "react";
import { Link, Outlet } from "react-router-dom";

import TwitterTimeline from "./containers/twitterTimeline/twitterTimeline";
import TwitterLogger from "./containers/twitterLogger";
import NavBar from "./containers/NavBar/NavBar";
/**
 * Entry point for the app
 * Initialize app-wide systems (request service)
 * Store any app-wide data if needed (should it be in a component?)
 */

function App() {

  return (
    
    <div className="App">
      <NavBar></NavBar>
      
      <TwitterLogger></TwitterLogger>

      <TwitterTimeline someProperty="test"></TwitterTimeline>
      
    </div>

  );

}


export default App;
