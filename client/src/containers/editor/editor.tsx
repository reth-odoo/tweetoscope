import { EditorDiv, EditTitle, WriteArea, SubmitButton, ConfirmText, HelpButton, EditInfo, EditPar, CloseButton } from "./styles";
import sendTweetThread from "../../apiRequests/sendTweetThread";
import getSelf from "../../apiRequests/getSelf";
import { formatTweet } from "./services/tweetFormat";
import { dateToString } from "../../commons/utils/dateFormater";
import { useEffect, useState } from 'react';
import Tweet from "src/commons/models/tweet";

function Editor(props: EditorProps) {

  // editor references
  const textArea = document.getElementById("editor-text-area") as HTMLInputElement; // cast because getElementById does not have value property by default in tsx
  const confArea = document.getElementById("editor-send-confirmation");

  // setup time
  const [localTime, setLocalTime] = useState(dateToString(new Date()));

  // get user data
  const [userData, setUserData] = useState({name: "", username: "", profile_image_url: ""});

  useEffect(() => {
    if(userData.name === "") {
      getUserData();
    }
    setInterval(() => {
      setLocalTime(dateToString(new Date()));
    }, 1000);
  }, []);

  const getUserData = async () => {
    const user: any = await getSelf();
    const data = user.data;
    setUserData({name: data.name, username: data.username, profile_image_url: data.profile_image_url});
  };

  // editor autocompletion
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {

    if(textArea) {
      let text = textArea?.value;
      // autocomplete parenthese
      if(event.key === "(") {
        text += ")";
        textArea.value = text;
        textArea.setSelectionRange(text.length-1, text.length-1);
      }
    }
  };

  // editor text submit handler
  const handleSubmit = () => {

    if(textArea && confArea) {

      if(textArea.value) {
        const formated_list: [string,string[]] = formatTweet(textArea.value);
        const tweet_thread: string[] = formated_list[1];

        // sends the tweet thread which has been formatted for twitter
        let response = props.SelectedTweet ? props.SelectedTweet.id : "";
        sendTweetThread(tweet_thread, response);

        // clear text when tweet sent
        textArea.value = "";
        // set sent confirmation message
        confArea.innerHTML = "Tweet successfully sent!";
        confArea.style.color = "#42f5aa";
      }

      else {
        // set warning message if empty text
        confArea.innerHTML = "Cannot write an empty tweet!";
        confArea.style.color = "#f56342";
      }
    }
  };

  // help display
  const showHelp = () => {

    if(textArea) {
      textArea.value = "#(This is a Title)\nTitles are used to indicate the start of a new thread.\n\n##(This is a Heading)\nHeadings are used to separate the thread into sections.\n\n###(This is a Subheading)\nSubheadings are used for subsections.\n\nYou can also write normal text, **(bold) text, and even *(italic) text!\n\nUse [img](link_to_image) to load an image.";
    }
  };

  const hideEditor = () => {
    const editorDiv = document.getElementById("editor-div");
    const timelineDiv = document.getElementById("timeline-div");
    const editorButton = document.getElementById("editor-button");

    if(editorDiv && timelineDiv && editorButton) {
      editorDiv.style.width = "0";
      timelineDiv.style.marginLeft = "0";
      editorButton.style.visibility = "visible";
    }
  };

  return(
    <EditorDiv id={"editor-div"}>
      <EditTitle>TwittoWrite Editor</EditTitle>
      <CloseButton onClick={hideEditor}>✖</CloseButton>
      <br/>
      <EditInfo>
        <img src={userData.profile_image_url} style={{ width:"30px", borderRadius:"50%" }}/>
        <span style={{color: "#55acee"}}>&nbsp;&nbsp;&nbsp;{userData.name} @{userData.username} - {localTime}</span>
      </EditInfo>
      <br/>
      <EditPar id={"editor-reply"}>{props.SelectedTweet ? ("Replying to @" + props.SelectedTweet.username) : ""}</EditPar>
      <br/>
      <WriteArea id={"editor-text-area"} name={"editor-text-area"} rows={18} cols={50} placeholder={"Type in your text here..."} onKeyDown={handleKeyDown}></WriteArea>
      <br/>
      <SubmitButton id={"editor-text-button"} onClick={handleSubmit}>Write Tweet</SubmitButton>
      <HelpButton id={"editor-help-button"} onClick={showHelp}>Need Help?</HelpButton>
      <ConfirmText id={"editor-send-confirmation"}></ConfirmText>
      <br/>
    </EditorDiv>
  );
}

interface EditorProps{
  SelectedTweet: Tweet|null
}

export default Editor;
