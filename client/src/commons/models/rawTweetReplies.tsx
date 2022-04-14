import RawTimeline from "./rawTimeline";
import getTweetReplies from "../../apiRequests/getTweetReplies";

/**
 * List of replies to a specific tweet
 */

class RawTweetReplies extends RawTimeline{

    async nextPage(): Promise<RawTweetReplies>{
        return await getTweetReplies(this.id,this.pagination_token);
    }

}

export default RawTweetReplies;