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

  const users = userParse(res_data.includes.users);

  var tweet_list: RawTweetReplies = new RawTweetReplies(tweet);

  for (let i = 0; i < res_data.data.length; i++){
    
    if (tweet.id === findReply(res_data.data[i].referenced_tweets)){

      var ntweet: RawTweet = tweetParse(res_data.data[i],users,tweet);
      tweet_list.addTweet(ntweet);

    }

  }

  tweet_list.pagination_token = res_data.meta.next_token;

  return tweet_list;

}

export default getTweetReplies;