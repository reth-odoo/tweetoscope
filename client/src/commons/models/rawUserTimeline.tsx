import { RawTweet } from "./rawTweet";
import getUserTimeline from "../../apiRequests/getUserTimeline";

/**
 * List of tweets generated from a UserTimeline
 */

class RawUserTimeline{

    private _timeline: RawTweet[];
    private _id: string;
    private _pagination_token: string;

    constructor(id: string){

        this._timeline = [];
        this._id = id;
        this._pagination_token = "";

    }

    get tweets(){
        return this._timeline;
    }

    set timeline(t: RawTweet[]){
        this._timeline = t;
    }

    get id(){
        return this._id;
    }

    set id(id: string){
        this._id = id;
    }

    get pagination_token(){
        return this._pagination_token;
    }

    set pagination_token(pagination_token: string){
        this._pagination_token = pagination_token;
    }

    addTweet(tweet: RawTweet){
        this._timeline.push(tweet);
    }

    async nextPage(): Promise<RawUserTimeline>{
        return await getUserTimeline(this.id,this.pagination_token);
    }

}

export default RawUserTimeline;