import serverRequest from './requestHandling/serverRequest';

/*
This module get the id of a user with their username
*/

async function getUserByName(username: string): Promise<any>{

  const route = "/twitter/getUserByName";

  var body = {
      username: username,
  };

  const res_data = await serverRequest(route, body);

  /*
  if(!res_data.data){
    throw new Error("Could not find user");
  }
  */

  return res_data.data;
}

export default getUserByName;
