import getTweetReplies from "../../apiRequests/getTweetReplies";
import getThread from "src/apiRequests/getThread";
import { RawTweet } from "./rawTweet";

/**
 * List of replies to a specific tweet
 */

class RawTweetReplies{

    private _timeline: RawTweet[];
    private _thread: RawTweet[];
    private _parent: RawTweet;
    private _pagination_token: string;

    constructor(tweet: RawTweet){

        this._timeline = [];
        this._thread = [];
        this._parent = tweet;
        this._pagination_token = "";

    }

    get timeline(){
        return this._timeline;
    }

    set timeline(t: RawTweet[]){
        this._timeline = t;
    }

    get thread(){
        return this._thread;
    }

    set thread(t: RawTweet[]){
        this._thread = t;
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

    addThreadTweet(tweet: RawTweet) {
        this._thread.push(tweet)
    }

    async fullThread(): Promise<RawTweet>{

        this.thread = await getThread(this._parent);

        var fullThread: string = this.parent.text;

        for (let i = this.thread.length - 1; i > 0; i--){
            fullThread += this.thread[i].text;
        }

        const fullTweet = new RawTweet(this.parent.id,
            this.parent.name,
            this.parent.username,
            this.parent.date,
            fullThread,
            this.parent.metrics,
            this.parent.parent,
            this.parent.loadedReplies);

        return fullTweet;

    }

    async nextPage(): Promise<RawTweetReplies>{
        return await getTweetReplies(this._parent,this.pagination_token);
    }

}

export default RawTweetReplies;