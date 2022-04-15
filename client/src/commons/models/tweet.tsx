import {RawTweet, PublicMetrics} from "./rawTweet";

/**
 * Tweet with enhanced tweetoscope features and data
 */
class Tweet extends RawTweet{


    constructor(id: string, name: string, username: string, date: Date, text: string, metrics: PublicMetrics, parent?: Tweet | null, replies?: Tweet[]) {
        super(id, name, username, date, text, metrics, parent, replies);
    }
}

export default Tweet;
