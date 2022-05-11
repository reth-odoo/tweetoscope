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

async function getTweetReplies(tweet: RawTweet, p_token?: string): Promise<RawTweetReplies>{

  // List of replies

  // Server Request

  const route = "/twitter/searchReplyTweets"

  var body = {
    id : tweet.id,
    p_token: p_token,
    conversation_id: tweet.conversation_id,
    user_id: tweet.username
  };

  const res_data = await serverRequest(route,body);

  if(res_data.meta.result_count === 0){
    return new RawTweetReplies(tweet);
  }

  // Create a data structure allowing easier access to user

  const users = userParse(res_data.includes.users);

  // Generate Replies List from Request Response

  var tweet_list: RawTweetReplies = new RawTweetReplies(tweet);

  for (let i = 0; i < res_data.data.length; i++){

    var ntweet: RawTweet = tweetParse(res_data.data[i],users,tweet);

    // Add Tweet to the list who are answer to the Request Tweet

    if (tweet.id === findReply(res_data.data[i].referenced_tweets)){

      tweet_list.addTweet(ntweet);

    }

  }

  // Pagination_token

  tweet_list.pagination_token = res_data.meta.next_token;

  return tweet_list;

}

export default getTweetReplies;