import Tweet from "src/commons/models/tweet";
import getUserTimeline from "src/apiRequests/getUserTimeline";
import RawUserTimeline from "../models/rawUserTimeline";
import { RawTweet } from "../models/rawTweet";
import { genTestTweets } from "src/AppParameters";

class TwitterService{


    private _last_request: Date|null= null;

    async getTimeline(){

        let tl_handle = await getUserTimeline("813286").catch(err => {
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
    }
}

export default TwitterService;
