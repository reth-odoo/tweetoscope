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
    private _profile_image: string;
    private _date: Date;
    private _text: string;
    private _replies: RawTweet[];
    private _parent: RawTweet | null;
    private _id: string;
    private _metrics: PublicMetrics;
    private _is_retweet: string | null;
    private _conversation_id: string | undefined;

    private _lastChildrenRequest: Date|null = null;

    constructor(id: string, name: string, username: string, profile_image: string, date: Date, text: string, metrics: PublicMetrics, parent?: RawTweet | null, replies?: RawTweet[]){

        this._id = id;
        this._name = name;
        this._username = username;
        this._profile_image = profile_image;
        this._date = date;
        this._text = text;

        //TODO: actually do this
        this._is_retweet = null;

        this._metrics = metrics;

        if(!replies){
            this._replies = [];
        }
        else{
            this._replies = replies;
        }

        if(parent && parent!==null) {
            this._parent = parent;
            this._conversation_id = parent.conversation_id;
        }
        else{
            this._parent = null;
            this._conversation_id = this.id;
        }

    }

    clone(): RawTweet{
        return new RawTweet(this.id, this.name, this.username, this.profile_image, this.date, this.text, this._metrics, this.parent, this.loadedReplies);
    }

    /**
     * Updates the replies if necessery and returns the updated list of replies
     */
    get replies(): Promise<RawTweet[]>{
        return new Promise(async (ok, err) => {
            //cache the response
            if(this._lastChildrenRequest===null){
            
                if(this.real_reply_nb<=0){
                    ok(this._replies);
                    return;
                }

                let reply_handle = await getTweetReplies(this).catch(error => {
                    console.error(`${error}. Keeping previous reply list`)
                    ok(this._replies)
                }) as RawTweetReplies;
                
                if(reply_handle){
                    this._replies = reply_handle.tweets;
                }
                
            }
            this._lastChildrenRequest = new Date(Date.now())
            ok(this._replies);
        });
    }

    /**
     * Returns the replies without attempting an update
     */
    get loadedReplies(){
        return this._replies;
    }

    debugAddReply(reply: RawTweet){
        this._replies.push(reply);
    }

    set parent(tweet: RawTweet){
        this._parent = tweet;
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

    get profile_image(): string{
        return this._profile_image;
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

    get metrics(){
        return this._metrics;
    }

    get likes(): number {
      return this._metrics.like_count;
    }

    get retweets(): number {
      return this._metrics.retweet_count;
    }

    get real_reply_nb(): number{
        return this._metrics.reply_count;
    }

    get is_retweet(): string | null {
      return this._is_retweet;
    }

    get conversation_id(){
        return this._conversation_id;
    }

    isRoot(): boolean{
        return this._parent == null || this._parent.id === this.id;
    }
}
