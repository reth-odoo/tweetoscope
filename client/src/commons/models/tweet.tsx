import {RawTweet, PublicMetrics} from "./rawTweet";

/**
 * Tweet with enhanced tweetoscope features and data
 */
class Tweet extends RawTweet{


    constructor(id: string, name: string, username: string, profile_image: string, date: Date, text: string, metrics: PublicMetrics, parent?: Tweet | null, replies?: Tweet[]) {
        super(id, name, username, profile_image, date, text, metrics, parent, replies);
    }
}

export default Tweet;
