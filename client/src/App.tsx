import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./assets/style.css";
import { BaseContainer, NavContainer, TlContainer, WglContainer } from "./baseStyle";
// import logo from "./logo.svg";

import TwitterTimeline from "./containers/twitterTimeline/twitterTimeline";
import TwitterLogger from "./containers/twitterLogger";
import NavBar from "./containers/NavBar/NavBar";
import getUserTimeline from "./apiRequests/getUserTimeline";
import getTweet from "./apiRequests/getTweet";
import getTweetReplies from "./apiRequests/getTweetReplies";
/**
 * Entry point for the app
 * Initialize app-wide systems (request service)
 * Store any app-wide data if needed (should it be in a component?)
 */

function App() {

  return (
    <><TwitterLogger></TwitterLogger><div className="App">
      <button onClick={() => getUserTimeline("2244994945", "7140dibdnow9c7btw420jnqp01o48wwk2j1wh0303jvhy")}>Test1</button>
      <button onClick={() => getTweet("1511201517432360965")}>Test2</button>
      <button onClick={() => getTweetReplies("1511143607385874434", "b26v89c19zqg8o3fpytlg0pvzdaktnakfqpk8q35estx9")}>Test3</button>
    </div>

    <BaseContainer>
      <NavContainer>
        <NavBar></NavBar>
        {/*<TwitterLogger></TwitterLogger>*/}
      </NavContainer>
      <WglContainer>
        Text Editor
        {/* ADD LEFT WIDGETS HERE */}
      </WglContainer>
      <TlContainer>
        <TwitterTimeline someProperty="test"></TwitterTimeline>
      </TlContainer>
    </BaseContainer>
    </>
  );
}


export default App;
