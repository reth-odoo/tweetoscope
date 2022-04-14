import serverRequest from './requestHandling/serverRequest';

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