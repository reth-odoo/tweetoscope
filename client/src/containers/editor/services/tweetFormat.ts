export function formatTweet(text: string) {

  const prefixDict: { [key: string]: string } = {"#": "heading1", "##": "heading2", "###": "heading3", "**": "bold", "*": "italic", "[link]": "link", "[img]": "image", "[gif]": "gif"};
  let formatedText = "";

  let lineArray = text.split("\n");

  for(const line of lineArray) {

    let prefix = {"reading": false, "name": ""};
    let write = {"current": false, "span": false};

    for(const char of line) {

      write.current = true;

      if("#*[".includes(char) && write.span === false) prefix.reading = true;

      if(prefix.reading && char === " ") {
        formatedText +=  prefix.name;
        prefix.name = "";
        prefix.reading = false;
      }

      // if we stumble upon a ( and we are reading the prefix, it means the prefix is over
      else if(char === "(" && prefix.reading) {
        if(prefixDict[prefix.name] !== undefined) {
          formatedText += `<span class=${prefixDict[prefix.name]}>`;
          // text to be set in the <span> tag relative to the prefix is the text until the next )
          write.span = true;
          write.current = false;
        }
        // if the prefix was not found, add it as text
        else formatedText += prefix.name;

        prefix.name = "";
        prefix.reading = false;
      }

      else if(char === ")" && write.span) {
        formatedText += "</span>";
        write.span = false;
        write.current = false;
      }

      if(prefix.reading) prefix.name += char;

      else if(write.current) formatedText += char;
    }

    // add break tag when end of line
    formatedText += "<br><br>";
  }

  return formatedText;
}
