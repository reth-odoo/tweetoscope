import serverRequest from './requestHandling/serverRequest';
import {RawTweet} from '../commons/models/rawTweet';
import RawTweetReplies from '../commons/models/rawTweetReplies';
import {tweetParse, userParse} from './requestHandling/dataParsing';

/*
This module get the id user's timeline
*/

async function getTweetReplies(id: string, p_token?: string): Promise<RawTweetReplies>{

  const route = "/twitter/searchReplyTweets"

  var body = {
    id : id,
    p_token: p_token,
  };

  const res_data = await serverRequest(route,body);

  if(res_data.meta.result_count === 0){
    return new RawTweetReplies(id);
  }

  const users = userParse(res_data.includes.users);

  var tweet_list: RawTweetReplies = new RawTweetReplies(id);


  for (let i = 0; i < res_data.data.length; i++){
    
    var tweet: RawTweet = tweetParse(res_data.data[i],users);

    tweet_list.addTweet(tweet);

  }

  tweet_list.pagination_token = res_data.meta.next_token;
  
  return tweet_list;

}

export default getTweetReplies;