import translateUnicode from "src/commons/utils/unicodeTranslator";

export function formatTweet(text: string) {

  const prefixDict: { [key: string]: string } = {"#": "heading1", "##": "heading2", "###": "heading3", "**": "bold", "*": "italic", "[link]": "link", "[img]": "image", "[gif]": "gif"};

  let twittoText = "";
  let twitterText = "";
  let twitter_threads: string[] = [];
  let heading_number = 1;
  let heading_number_below = 1;
  let styleType = "";

  let lineArray = text.split("\n");

  for(const line of lineArray) {

    let prefix = {"reading": false, "name": ""};
    let write = {"current": false, "span": false};

    for(const char of line) {

      write.current = true;

      if("#*[".includes(char) && !write.span) prefix.reading = true;

      if(prefix.reading && char === " ") {
        twittoText += prefix.name;
        twitterText += prefix.name;
        prefix.name = "";
        prefix.reading = false;
      }

      // if we stumble upon a ( and we are reading the prefix, it means the prefix is over
      else if(char === "(" && prefix.reading && !write.span) {
        if(prefixDict[prefix.name] !== undefined) {
          // add a span for the twittoscope text
          twittoText += `<span class=${prefixDict[prefix.name]}>`;
          // different cases for twitter text
          if(prefix.name === "#") {
            twitter_threads.push(twitterText);
            twitterText = "";
            twitterText += "THREAD: ";
          }
          else if(prefix.name === "##") {
            twitter_threads.push(twitterText);
            twitterText = "";
            twitterText += `${heading_number}. `;
            heading_number += 1;
          }
          else if(prefix.name === "###") {
            twitter_threads.push(twitterText);
            twitterText = "";
            twitterText += `${heading_number - 1}.${heading_number_below}. `;
            heading_number_below += 1;
          }
          else if(prefix.name === "**") {
            styleType = "bold";
          }
          else if(prefix.name === "*") {
            styleType = "italic";
          }
          // text to be set in the <span> tag relative to the prefix is the text until the next )
          write.span = true;
          write.current = false;
        }
        // if the prefix was not found, add it as text
        else {
          twittoText += prefix.name;
          twitterText += prefix.name;
        }

        prefix.name = "";
        prefix.reading = false;
      }

      else if(char === ")" && write.span) {
        twittoText += "</span>";
        write.span = false;
        write.current = false;
        styleType = "";
      }

      if(prefix.reading) prefix.name += char;

      else if(write.current) {
        if(styleType !== "") {
          twittoText += translateUnicode(char, styleType);
          twitterText += translateUnicode(char, styleType);
        }
        else {
          twittoText += char;
          twitterText += char;
        }
      }
    }

    // add break tag when end of line
    twittoText += "<br><br>";
    twitterText += "\n";
  }

  twitter_threads.push(twitterText);

  // if the tweet started with a title, then an empty string was set at index 0 so we need to remove it
  if(twitter_threads[0] === "") {
    twitter_threads.shift();
  }

  const format_list: [string, string[]] = [twittoText, twitter_threads];

  console.log(format_list);

  return format_list;
}
