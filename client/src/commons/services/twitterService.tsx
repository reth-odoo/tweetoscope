import Tweet from "src/commons/models/tweet";
import getUserTimeline from "src/apiRequests/getUserTimeline";
import RawTimeline from "../models/rawTimeline";
import { RawTweet } from "../models/rawTweet";
import { genTestTweet } from "src/AppParameters";

class TwitterService{


    private _last_request: Date|null= null;

    async getTimeline(){

        let tl_handle = await getUserTimeline("813286").catch(err => {
            console.error(`${err}. Loading example data`)
            let tl = new RawTimeline("1");
            tl.addTweet(genTestTweet());
            setTimeout(()=>{},500);
            return tl;
        }
        );
        return tl_handle.tweets;
    }
}

export default TwitterService;
