import { DEFAULT_TWEET_DIMENSIONS } from "src/AppParameters";
import Tweet from "./tweet";

class DisplayTweet{

    position: {x: number, y: number};
    dimension: {width: number, height: number};

    subtreeSpan: {startX: number, endX: number};

    private _displayChildren: DisplayTweet[];
    private _displayParent: DisplayTweet|null;
    private _hidden: boolean;

    private _tweet: Tweet;

    constructor(tweet: Tweet, position: {x: number, y: number}, displayParent?: DisplayTweet, displayChildren?: DisplayTweet[]){

        this._tweet = tweet;

        this.position = position;
        this.dimension = DEFAULT_TWEET_DIMENSIONS;
        this.subtreeSpan = {startX: this.position.x, endX: this.position.x+this.dimension.width};

        this._displayParent = displayParent?displayParent:null;
        this._displayChildren = displayChildren?displayChildren:[];

        this._hidden = false;

    }

    addDisplayChild(child: DisplayTweet){
        this._displayChildren.push(child);
    }
    get displayChildren(): Promise<DisplayTweet[]>{

        return new Promise(async (ok, err) => {
            let reps = await this._tweet.replies;
            let currentIds = this._displayChildren.map(dp => dp._tweet.id)

            //if id already used, don't add rep to _displayChildren
            for(const rep of reps){
                let add = true;
                for(const currentId of currentIds){
                    if(currentId === rep.id){
                        add = false;
                    }
                }
                if(add){
                    this._displayChildren.push(new DisplayTweet(rep, {x:0, y:0}, this));
                }
            }
            ok(this._displayChildren);
        });
    }

    setDisplayParent(parent: DisplayTweet){
        this._displayParent = parent;
    }

    get displayParent(){
        return this._displayParent;
    }

    get displayRoot(): DisplayTweet{
        if(this.displayParent){
            return this.displayParent.displayRoot;
        }
        return this;
    }

    /*setHiddenRec(state: boolean){
        //TODO assert parent not hidden?
        this._hidden = state;
        for(const child of this._displayChildren){
            child.setHiddenRec(state);
        }
    }*/

    setHidden(state: boolean){
        this._hidden = state;
    }

    get isHidden(){
        return this._hidden;
    }


    resetPosition(){
        this.position = {x:0, y:0};
        this.subtreeSpan = {startX: this.position.x, endX: this.position.x+this.dimension.width};
    }


    //get data from tweet (not a subclass to avoid redundant data)
    //modifying the tweet would update the display as well
    get id(){
        return this._tweet.id;
    }
    get text(){
        return this._tweet.text;
    }
    get stringDate(){
        return this._tweet.stringDate;
    }
    get username(){
        return this._tweet.username;
    }
    get name(){
        return this._tweet.name;
    }
    get likes() {
      return this._tweet.likes;
    }
    get retweets() {
      return this._tweet.retweets;
    }
    get real_reply_nb() {
      return this._tweet.real_reply_nb;
    }
    get is_retweet() {
      return this._tweet.is_retweet;
    }
}

export default DisplayTweet;
