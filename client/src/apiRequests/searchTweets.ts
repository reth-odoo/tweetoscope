import serverRequest from './requestHandling/serverRequest';
import {RawTweet} from '../commons/models/rawTweet';
import {tweetParse, userParse} from './requestHandling/dataParsing';

async function searchTweet(search: string, p_token: string = ""): Promise<any>{

  // Server Request

  const route = "/twitter/searchTweets"

  var body = {
    search : search,
    p_token: p_token,
  };

  const res_data = await serverRequest(route,body);

  if(res_data.meta.result_count === 0){

    return {search: null, p_token: null};

  }

  // Create a data structure allowing easier access to user

  const users = userParse(res_data.includes.users);

  // Generate Replies List from Request Response

  var tweet_list: RawTweet[] = [];

  for (let i = 0; i < res_data.data.length; i++){

    var ntweet: RawTweet = tweetParse(res_data.data[i],users);
    tweet_list.push(ntweet);

  }

  const p2_token = res_data.meta.next_token;
  const result = {search: tweet_list, p_token: p2_token}

  return result;

}

export default searchTweet;