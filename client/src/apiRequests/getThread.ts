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

  // Thread composition

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

  var tweet_list2: RawTweet[] = []; //List of Raw_tweet that composes the thread

  for (let i = 0; i < thread_data.data.length; i++){

    var ntweet2: RawTweet = tweetParse(thread_data.data[i],users2,tweet);

    if (tweet.id === findReply(thread_data.data[i].referenced_tweets)){

      tweet_list2.push(ntweet2);

    }

  }

  // Pagination_token

  return tweet_list2;

}

export default getThread;