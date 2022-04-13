import getTweet from "../../apiRequests/getTweet";
import getTweetReplies from "../../apiRequests/getTweetReplies";
import { dateToString } from "../utils/dateFormater";
import RawTweetReplies from "./rawTweetReplies";


export interface PublicMetrics{
    retweet_count:number, 
    reply_count: number, 
    like_count: number, 
    quote_count: number
}

/**
 * Representation of a tweet from the API
 * (no thread aggregation)
 */
export class RawTweet{

    private _name: string;
    private _username: string;
    private _date: Date;
    private _text: string;
    private _replies: RawTweet[];
    private _parent: RawTweet | null;
    private _id: string;
    private _metrics: PublicMetrics;


    private _lastChildrenRequest: Date|null = null;

    constructor(id: string, name: string, username: string, date: Date, text: string, metrics: PublicMetrics, parent?: RawTweet | null, replies?: RawTweet[])  {

        this._id = id;
        this._name = name;
        this._username = username;
        this._date = date;
        this._text = text;

        this._metrics = metrics;

        if(!replies){
            this._replies = [];
        }else{
            this._replies = replies;
        }

        if(parent && parent!==null) {
            this._parent = parent;
        }else{
            this._parent = null;
        }

    }

    clone(): RawTweet{
        return new RawTweet(this.id, this.name, this.username, this.date, this.text, this._metrics, this.parent, this.loadedReplies);
    }

    /**
     * Updates the replies if necessery and returns the updated list of replies
     */
    get replies(): Promise<RawTweet[]>{
        return new Promise(async (ok, err) => {
            //cache the response
            if(this._lastChildrenRequest===null){
                let reply_handle = await getTweetReplies(this.id).catch(error => err(error)) as RawTweetReplies;
                this._replies = reply_handle.tweets
            }
            ok(this._replies);
        });
    }

    /**
     * Returns the replies without attempting an update
     */
    get loadedReplies(){
        return this._replies;
    }

    get parent(){
        return this._parent;
    }

    //probably won't be used?
    async getParentRequest(): Promise<RawTweet | null>{
        if(this._parent && this._parent!=null){
            return await getTweet(this._parent!._id);
        }
        return null;
    }

    get name(): string{
        return this._name;
    }
    get username(): string{
        return this._username;
    }
    get text(): string{
        return this._text;
    }

    get date(): Date{
        return this._date;
    }

    get stringDate(): string{
        return dateToString(this._date);
    }

    get id(): string{
        return this._id;
    }

    get likes(): number {
      return this._metrics.like_count;
    }

    get retweets(): number {
      return this._metrics.retweet_count;
    }

    isRoot(): boolean{
        return this._parent == null || this._parent.id === this.id;
    }
}
