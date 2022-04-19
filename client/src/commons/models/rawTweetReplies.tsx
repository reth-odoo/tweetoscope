import getTweetReplies from "../../apiRequests/getTweetReplies";
import { RawTweet } from "./rawTweet";

/**
 * List of replies to a specific tweet
 */

class RawTweetReplies{

    private _timeline: RawTweet[];
    private _tweet: RawTweet;
    private _pagination_token: string;

    constructor(tweet: RawTweet){

        this._timeline = [];
        this._tweet = tweet;
        this._pagination_token = "";

    }

    get tweets(){
        return this._timeline;
    }

    set timeline(t: RawTweet[]){
        this._timeline = t;
    }

    get tweet(){
        return this._tweet;
    }

    set tweet(tweet: RawTweet){
        this._tweet = tweet;
    }

    get pagination_token(){
        return this._pagination_token;
    }

    set pagination_token(pagination_token: string){
        this._pagination_token = pagination_token;
    }

    addTweet(tweet: RawTweet) {
        this._timeline.push(tweet)
    }

    async nextPage(): Promise<RawTweetReplies>{
        return await getTweetReplies(this.tweet,this.pagination_token);
    }

}

export default RawTweetReplies;