import serverRequest from './requestHandling/serverRequest';

/*
This module get the id tweet from the server
*/

async function getSelf(): Promise<Object>{

  const route = "/twitter/currentUser";

  var body = {
  };

  const res_data = await serverRequest(route, body);

  if(!res_data.data){
    throw new Error("Could not find self");
  }

  //localStorage.setItem("user_data", res_data.data);
  return res_data;
}

export default getSelf;
