import Tweet from "src/commons/models/tweet";
import getUserTimeline from "src/apiRequests/getUserTimeline";
import RawUserTimeline from "../models/rawUserTimeline";
import { RawTweet } from "../models/rawTweet";
import { genTestTweets } from "src/AppParameters";
import getSelf from "../../apiRequests/getSelf";

class TwitterService{


    private _last_request: Map<string, Date> = new Map();

<<<<<<< HEAD
    async getTimeline(id: string = "813286"){

      // default id is Barack Obama's Twitter

      /*
      const user: any = await getSelf();
      const data = user.data;
      if(data) {
        chosen_id = data.id;
      }
      */

      let tl_handle = await getUserTimeline(id).catch(err => {
          console.error(`${err}. Loading example data`)
          let tl = new RawUserTimeline("1");
          for(const tweet of genTestTweets()){
              tl.addTweet(tweet);
          }
          setTimeout(()=>{}, 500);
          return tl;
      });
      return tl_handle.tweets;
=======
    async getTimeline(id: string){

        let tl_handle = await getUserTimeline(id).catch(err => {
            console.error(`${err}. Loading example data`)
            let tl = new RawUserTimeline("1");
            for(const tweet of genTestTweets()){
                tl.addTweet(tweet);
            }
            setTimeout(()=>{},500);
            return tl;
        }
        );
        return tl_handle.tweets;
>>>>>>> 16d9974ebf64afe9b4d570824bf98410a86e2b53
    }
}

export default TwitterService;
