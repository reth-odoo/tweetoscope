import serverRequest from './requestHandling/serverRequest';

/*
This module send a tweet
*/

async function sendTweet(text: string, response: string ="", quoted: string=""): Promise<Object>{

  const route = "/twitter/sendTweet";

  const body = {
    text : text,
    in_reply_to_tweet_id:response,
    quote_tweet_id:quoted,

  };

  const a = await serverRequest(route,body);

  const b = a?.data;

  console.log("Send Tweet: ", b);
  return b.data;

}

export default sendTweet;