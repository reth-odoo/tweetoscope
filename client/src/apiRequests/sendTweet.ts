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

  const res_data = await serverRequest(route,body);

  console.log("Send Tweet: ", res_data);
  return res_data.data;

}

export default sendTweet;