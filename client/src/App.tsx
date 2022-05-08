import React, { useState } from "react";
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
import sendTweet from "./apiRequests/sendTweet";
import sendBigTweet from "./apiRequests/sendBigTweet";

import Editor from "./containers/editor/editor";
import Tweet from "./commons/models/tweet";
/**
 * Entry point for the app
 * Initialize app-wide systems (request service)
 * Store any app-wide data if needed (should it be in a component?)
 */

function App() {

  /* Start of shared state */

  //assumed read-only state except for TwitterTimeline

  const [selectedTweet, setSelectedTweet]: [null|Tweet, any] = useState(null);
  const [requestDisplayRefresh, setRefreshRequestFn]: [() => void, any] = useState(()=>{return ()=>{}})

  /* End of shared state */

  return (
    <BaseContainer>
      <NavContainer>
        <NavBar></NavBar>
        {/*<TwitterLogger></TwitterLogger>*/}
      </NavContainer>
      <WglContainer>
        <Editor SelectedTweet={selectedTweet}></Editor>
      </WglContainer>
      <TlContainer>
        <TwitterTimeline SelectTweet={setSelectedTweet} SetRefreshHandle={setRefreshRequestFn}></TwitterTimeline>
      </TlContainer>
    </BaseContainer>
  );
}


export default App;
