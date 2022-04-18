import serverRequest from './requestHandling/serverRequest';
import {RawTweet} from '../commons/models/rawTweet';
import {tweetParse, userParse} from './requestHandling/dataParsing';

/*
This module get the id tweet from the server
*/

async function getTweet(id: string): Promise<RawTweet>{

  const route = "/twitter/getTweet";

  var body = {
    id : id,
  };

  const res_data = await serverRequest(route,body);

  if(res_data.meta.result_count === 0){
    throw new Error("Could not find the tweet (result_count==0)");
  }


  const users = userParse(res_data.includes.users);

  var tweet: RawTweet = tweetParse(res_data.data,users);

  return tweet;

}

export default getTweet;