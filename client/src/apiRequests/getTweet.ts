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

  const a = await serverRequest(route,body);

  const b = a?.data;

  const users = userParse(b.includes.users);

  var tweet: RawTweet = tweetParse(b.data,users);

  return tweet;

}

export default getTweet;