import { EditorDiv, EditHeader, WriteArea, SubmitButton, ConfirmText } from "./styles";
import sendBigTweet from "../../apiRequests/sendBigTweet";
import getSelf from "../../apiRequests/getSelf";
import { formatTweet } from "./services/tweetFormat";

function Editor() {

  const handleSubmit = () => {
    const text_area = (document.getElementById("tweet-text-area") as HTMLInputElement); // cast because getElementById does not have value property by default in tsx
    const conf_area = document.getElementById("tweet-send-confirmation");

    if(text_area && conf_area) {
      if(text_area.value) {
        const formatedText = formatTweet(text_area.value);
        sendBigTweet(formatedText);

        // clear text when tweet sent
        text_area.value = "";
        // set sent confirmation message
        conf_area.innerHTML = "Tweet successfully sent!";
        conf_area.style.color = "green";
      }
      else {
        // set warning message if empty text
        conf_area.innerHTML = "Cannot write an empty tweet!";
        conf_area.style.color = "red";
      }
    }
  }

  return(
    <EditorDiv>
      <EditHeader>TwittoWrite Editor</EditHeader>
      <br/>
      <p style={{ color: "#55acee"}}>{/*{user.data.name} @{user.data.username}*/}Mary Sue @themarysue - 12 april 2022 at 17:44</p>
      <br/>
      <WriteArea id={"tweet-text-area"} name={"tweet-text-area"} rows={20} cols={40} placeholder={"Type in your text here..."}></WriteArea>
      <SubmitButton id={"tweet-text-button"} onClick={handleSubmit}>Write Tweet</SubmitButton>
      <ConfirmText id={"tweet-send-confirmation"}></ConfirmText>
      <br/>
    </EditorDiv>
  );
}

export default Editor;
