import serverRequest from './requestHandling/serverRequest';
import rawUserList from '../commons/models/rawUserList'

/*
This module get the list of the followers of the user corresponding to id
*/

async function getFollowers(id: string, p_token: string = ""): Promise<any>{

  const route = "/twitter/getFollowers";

  var body = {
      id: id,
      p_token: p_token
  };

  console.log(body);

  const a = await serverRequest(route, body);

  let followerList = [];

  console.log(a);

  for(const user of a.data) {
    followerList.push(user);
  }

  //const data = new rawUserList(id, a?.data.data, a?.data.meta.next_token);

  return followerList;
}

export default getFollowers;
