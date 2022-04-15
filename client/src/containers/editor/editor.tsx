import { EditorDiv, EditHeader } from "./styles";

function Editor() {

  return(
    <EditorDiv>
      <EditHeader>TwittoWrite Editor</EditHeader>
      <br/>
      <p style={{ color: "#55acee"}}>Mary Sue @themarysue - 12 april 2022 at 17:44</p>
      <br/>
      <textarea name={"tweet-text-area"} form={"tweet-text-form"} rows={20} cols={40} placeholder={"Type in your text here..."}></textarea>
      <form id={"tweet-text-form"}>
        <input type={"submit"} value={"Write Tweet"}/>
      </form>
      <br/>
    </EditorDiv>
  );
}

export default Editor;
