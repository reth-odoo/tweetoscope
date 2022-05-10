import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./assets/style.css";
import { BaseContainer, MainContainer, NavContainer, EditorButton } from "./baseStyle";
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

  const showEditor = () => {
    const editorDiv = document.getElementById("editor-div");
    const timelineDiv = document.getElementById("timeline-div");
    const editorButton = document.getElementById("editor-button");

    if(editorDiv && timelineDiv && editorButton) {
      editorButton.style.visibility = "hidden";
      editorDiv.style.width = "30vw";
      timelineDiv.style.marginLeft = "30vw";
    }
  };

  /* End of shared state */

  return (
    <BaseContainer>
      <NavContainer>
        <NavBar></NavBar>
        {/*<TwitterLogger></TwitterLogger>*/}
      </NavContainer>
      <MainContainer>
        <Editor SelectedTweet={selectedTweet}></Editor>
        <EditorButton id={"editor-button"} onClick={showEditor}>⇦ Editor</EditorButton>
        <TwitterTimeline SelectTweet={setSelectedTweet} SetRefreshHandle={setRefreshRequestFn}></TwitterTimeline>
      </MainContainer>
    </BaseContainer>
  );
}


export default App;
