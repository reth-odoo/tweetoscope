import serverRequest from './apiRequests';

/*
This module get the id user's timeline
*/

function getUserTimeline(id: string, p_token: string = ""){

  const route = "/twitter/UserTimeline"

  var body = {
    id : id,
    p_token: p_token,
  };

  return serverRequest(route,body);

}

export default getUserTimeline;