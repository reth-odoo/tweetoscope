import Tweet from "src/commons/models/tweet";
import getUserTimeline from "src/apiRequests/getUserTimeline";

class TwitterService{


    private _last_request: Date|null= null;

    async getTimeline(){
        let tl_handle = await getUserTimeline("813286");
        return tl_handle.tweets;
    }
}

export default TwitterService;
