import React, { useEffect, useState } from "react";
import "./assets/style.css";
import { BaseContainer, MainContainer, NavContainer, EditorButton } from "./baseStyle";

import TwitterTimeline from "./containers/twitterTimeline/twitterTimeline";
import NavBar from "./containers/NavBar/NavBar";

import Editor from "./containers/editor/editor";
import Tweet from "./commons/models/tweet";
import TwitterService from "./commons/services/twitterService";
import getSelf from "src/apiRequests/getSelf";

/**
 * Entry point for the app
 * Initialize app-wide systems (request service)
 * Store any app-wide data if needed (should it be in a component?)
 */

function App() {

  /* Start of shared state */

  //assumed read-only state except for TwitterTimeline

  const [twitter, setTwitterQuerrier] = useState(new TwitterService());
  const [selectedTweet, setSelectedTweet]: [null|Tweet, any] = useState(null);
  const [requestDisplayRefresh, setRefreshRequestFn]: [() => void, any] = useState(()=>{return ()=>{}});
  const [timelineId, setTimelineId] = useState("783214");

  /* End of shared state */

  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    const user: any = await getSelf();

    if(user) {
      if(user.data) {
        if(user.data.id) {
          setTimelineId(user.data.id);
        }
      }
    }
  };

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

  return (
    <BaseContainer>
      <NavContainer>
        <NavBar SetTimelineId={setTimelineId}></NavBar>
        {/*<TwitterLogger></TwitterLogger>*/}
      </NavContainer>
      <MainContainer>
        <Editor SelectedTweet={selectedTweet}></Editor>
        <EditorButton id={"editor-button"} onClick={showEditor}>⇦ Editor</EditorButton>
        <TwitterTimeline timelineId={timelineId} twitterService={twitter} SelectTweet={setSelectedTweet} SetRefreshHandle={setRefreshRequestFn}></TwitterTimeline>
      </MainContainer>
    </BaseContainer>
  );
}


export default App;
