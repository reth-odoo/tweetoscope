import serverRequest from './apiRequests';

/*
This module get the id tweet from the server
*/

function getTweet(id: string){

  const route = "/twitter/getTweet"

  var body = {
    id : id,
  };

  return serverRequest(route,body);

}

export default getTweet;