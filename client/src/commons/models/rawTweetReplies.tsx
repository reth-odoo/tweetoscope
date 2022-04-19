import getTweetReplies from "../../apiRequests/getTweetReplies";
import { RawTweet } from "./rawTweet";

/**
 * List of replies to a specific tweet
 */

class RawTweetReplies{

    private _timeline: RawTweet[];
    private _parent: RawTweet;
    private _pagination_token: string;

    constructor(tweet: RawTweet){

        this._timeline = [];
        this._parent = tweet;
        this._pagination_token = "";

    }

    get tweets(){
        return this._timeline;
    }

    set timeline(t: RawTweet[]){
        this._timeline = t;
    }

    get parent(){
        return this._parent;
    }

    set parent(tweet: RawTweet){
        this._parent = tweet;
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
        return await getTweetReplies(this._parent,this.pagination_token);
    }

}

export default RawTweetReplies;