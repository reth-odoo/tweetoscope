import serverRequest from './requestHandling/serverRequest';
import rawUserList from '../commons/models/rawUserList'

/*
This module get the list of the followers of the user corresponding to id
*/

async function getFollowers(id: string, p_token: string = ""): Promise<Object>{

  const route = "/twitter/getFollowers";

  var body = {
      id: id,
      p_token: p_token
  };

  const a = await serverRequest(route,body);

  const data = new rawUserList(id, a?.data.data, a?.data.meta.next_token);

  console.log("Result: ", data);

  return data;

}

export default getFollowers;