import serverRequest from './apiRequests';

/*
This module get the id tweet from the server
*/

function mockup(id: string){

  const route = "/twitter/mockup" // Route in the server

  //list of the relevant parameters for the request

  var body = {
    id : id,
  };

  return serverRequest(route,body);

}

export default mockup;