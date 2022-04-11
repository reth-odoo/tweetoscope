import RawTweet from "./rawTweet";

/**
 * Tweet with enhanced tweetoscope features and data
 */
class Tweet extends RawTweet{


    constructor(id: string, name: string, username: string, date: Date, text: string, likes: number, retweets: number, parent?: Tweet | null, replies?: Tweet[]) {
        super(id, name, username, date, text, likes, retweets, parent, replies);
    }
}

export default Tweet;
