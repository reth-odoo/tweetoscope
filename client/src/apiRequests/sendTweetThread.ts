import sendTweet from "./sendTweet";

async function sendTweetThread(thread: string[], response: string = "", quoted: string = ""){

  let sized_list: string[] = [];

  for(const tweet of thread) {
    const subdata = tweet.match(/(.|[\r\n]){1,140}/g); // if tweet is too long, split it
    if(subdata) {
      for(const data of subdata) {
        sized_list.push(data);
      }
    }
  }

  var conversation: any;
  conversation = await sendTweet(sized_list[0], response, quoted);

  for(let i = 1; i < sized_list.length; i++) {
    const tweet = sized_list[i];
    conversation = await sendTweet(tweet, conversation.id);
  }

  return conversation;
}

export default sendTweetThread;
