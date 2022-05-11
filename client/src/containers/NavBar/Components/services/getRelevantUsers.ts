import getSelf from "../../../../apiRequests/getSelf";
import getFollowers from "../../../../apiRequests/getFollowers";

async function getRelevantUsers(text: string) {

  let id = "813286"; // default to Barack Obama

  /*
  const user: any = await getSelf();
  if(user) {
    const data = user.data;
    if(data) {
      id = data.id;
    }
  }
  */

  let relevantUsers = [];
  const followers = await getFollowers(id);

  for(const user of followers) {

    if(user.username.includes(text)) {
      relevantUsers.push(user.username);
    }
  }

  console.log(relevantUsers);

  return relevantUsers;
}

export { getRelevantUsers };
