import serverRequest from './requestHandling/serverRequest';
import {RawTweet} from '../commons/models/rawTweet';
import RawTweetReplies from '../commons/models/rawTweetReplies';
import {tweetParse, userParse} from './requestHandling/dataParsing';
/*
This module get the id user's timeline
*/

type reference_format = {
    type: string; 
    id: string
  };
  
  function findReply(tweet_list: Array<reference_format>){
  
    for(let i = 0; i < tweet_list.length; i++){
      if(tweet_list[i].type === "replied_to"){
        return tweet_list[i].id;
      }
    }
  
  }
  
async function getThread(tweet: RawTweet, p_token?: string): Promise<RawTweet[]>{

  // Request preparation

  const route2 = "/twitter/getThread"

  var body2 = {
    id : tweet.id,
    p_token: p_token,
    conversation_id: tweet.conversation_id,
    user_id: tweet.username
  };

  // Request Execution
  
  const thread_data = await serverRequest(route2,body2); 

  // Parsing the Response Users into a more useable format
  
  const users2 = userParse(thread_data.includes.users);

  var tweet_list: RawTweet[] = []; //List of Raw_tweet that composes the thread
  var precedent_tweet: RawTweet = tweet; 
  var ntweet: RawTweet;

  for (let i = thread_data.data.length-1; i <= 0 ; i--){

    // Check if it can find a tweet that answer precedent tweet, add it to tweet_list if it is

    if (precedent_tweet.id === findReply(thread_data.data[i].referenced_tweets)){
      ntweet = tweetParse(thread_data.data[i],users2,tweet);
      tweet_list.push(ntweet);
      precedent_tweet = ntweet;

    }

  }

  return tweet_list;

}

export default getThread;