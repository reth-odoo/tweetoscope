import serverRequest from './requestHandling/serverRequest';
import RawTweet from '../commons/models/rawTweet';
import {tweetParse, userParse} from './requestHandling/dataParsing';

/*
This module get the id tweet from the server
*/

async function getSelf(): Promise<Object>{

  const route = "/twitter/currentUser";

  var body = {
  };

  const a = await serverRequest(route,body);

  const data = a?.data;

  return data;

}

export default getSelf;