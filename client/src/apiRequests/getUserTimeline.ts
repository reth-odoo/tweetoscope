import serverRequest from './requestHandling/serverRequest';
import RawTweet from 'src/commons/models/rawTweet';
import RawUserTimeline from 'src/commons/models/rawUserTimeline';
import {tweetParse, userParse} from './requestHandling/dataParsing';

/*
This module get the id user's timeline
*/

async function getUserTimeline(id: string, p_token?: string): Promise<RawUserTimeline>{

  const route = "/twitter/UserTimeline"

  var body = {
    id : id,
    p_token: p_token,
  };

  const a = await serverRequest(route,body);

  const b = a?.data;

  const users = userParse(b.includes.users);

  var tweet_list: RawUserTimeline = new RawUserTimeline(id);

  for (let i = 0; i < b.data.length; i++){
    
    var tweet: RawTweet = tweetParse(b.data[i],users);

    tweet_list.addTweet(tweet);

  }

  tweet_list.pagination_token = b.meta.next_token;
  
  return tweet_list;

}

export default getUserTimeline;