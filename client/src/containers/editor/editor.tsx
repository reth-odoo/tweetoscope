import { EditorDiv, EditHeader, WriteArea, SubmitButton, ConfirmText, HelpButton } from "./styles";
import sendTweetThread from "../../apiRequests/sendTweetThread";
import getSelf from "../../apiRequests/getSelf";
import { formatTweet } from "./services/tweetFormat";
import { dateToString } from "../../commons/utils/dateFormater";
import { useEffect, useState } from 'react';

function Editor() {

  // get user data
  const [userData, setUserData] = useState("");

  useEffect(() => {
    if(!userData) {
      getUserData();
    }
  }, []);

  const getUserData = async () => {
    const user: any = await getSelf();
    const data = user.data;
    setUserData(`${data.name} @${data.username}`);
  };

  // editor text submit handler
  const handleSubmit = () => {
    const text_area = (document.getElementById("tweet-text-area") as HTMLInputElement); // cast because getElementById does not have value property by default in tsx
    const conf_area = document.getElementById("tweet-send-confirmation");

    if(text_area && conf_area) {
      if(text_area.value) {
        const formated_list: [string,string[]] = formatTweet(text_area.value);
        const tweet_thread: string[] = formated_list[1];
        console.log(formated_list);
        console.log(tweet_thread);
        // sends the tweet thread which has been formatted for twitter
        sendTweetThread(tweet_thread);

        // clear text when tweet sent
        text_area.value = "";
        // set sent confirmation message
        conf_area.innerHTML = "Tweet successfully sent!";
        conf_area.style.color = "#42f5aa";
      }
      else {
        // set warning message if empty text
        conf_area.innerHTML = "Cannot write an empty tweet!";
        conf_area.style.color = "#f56342";
      }
    }
  }

  // help display
  const showHelp = () => {
    const text_area = (document.getElementById("tweet-text-area") as HTMLInputElement); // cast because getElementById does not have value property by default in tsx

    if(text_area) {
      text_area.value = "#(This is a Title)\nTitles are used to indicate the start of a new thread.\n\n##(This is a Heading)\nHeadings are used to separate the thread into sections.\n\n###(This is a Subheading)\nSubheadings are used for subsections.\n\nYou can also write normal text, **(bold) text, and even *(italic) text!";
    }
  };

  // date updater
  setInterval(() => {

    const time_area = document.getElementById("editor-time-area");

    if(time_area) {
      let time = new Date();
      time_area.innerHTML = dateToString(time);
    }

  }, 1000);

  return(
    <EditorDiv>
      <EditHeader>TwittoWrite Editor</EditHeader>
      <br/>
      <p style={{ color: "#55acee"}}>
        <span id={"editor-user-area"}>{userData} -&nbsp;</span>
        <span id={"editor-time-area"}></span>
      </p>
      <br/>
      <WriteArea id={"tweet-text-area"} name={"tweet-text-area"} rows={20} cols={40} placeholder={"Type in your text here..."}></WriteArea>
      <SubmitButton id={"tweet-text-button"} onClick={handleSubmit}>Write Tweet</SubmitButton>
      <HelpButton id={"tweet-help-button"} onClick={showHelp}>Need Help?</HelpButton>
      <ConfirmText id={"tweet-send-confirmation"}></ConfirmText>
      <br/>
    </EditorDiv>
  );
}

export default Editor;
