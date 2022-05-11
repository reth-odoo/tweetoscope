import { DEFAULT_TWEET_DIMENSIONS, DEFAULT_TWEET_UNWRAP_DEPTH } from "src/AppParameters";
import Tweet from "./tweet";

class DisplayTweet{

    position: {x: number, y: number};
    dimension: {width: number, height: number};

    subtreeSpan: {startX: number, endX: number};



    private _displayChildren: DisplayTweet[];
    private _displayParent: DisplayTweet|null;
    private _selected: boolean;

    //true if no children should be displayed
    private _hiding: boolean;

    private _depth: number|null;

    //function to call when changing selected state
    private _selected_callback: (select: boolean) => void = () => {};

    private _tweet: Tweet;

    constructor(tweet: Tweet, position: {x: number, y: number}, displayParent?: DisplayTweet, displayChildren?: DisplayTweet[]){

        this._tweet = tweet;

        this.position = position;
        this.dimension = DEFAULT_TWEET_DIMENSIONS;
        this.subtreeSpan = {startX: this.position.x, endX: this.position.x+this.dimension.width};

        this._displayParent = displayParent?displayParent:null;
        this._displayChildren = displayChildren?displayChildren:[];

        this._depth = null;

        this._hiding = this.displayDepth>=DEFAULT_TWEET_UNWRAP_DEPTH;
        this._selected = false;

    }

    addDisplayChild(child: DisplayTweet){
        this._displayChildren.push(child);
    }
    /**
     * returns children and requests them if needed
     */
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
    /**
     * returns children already visibly displayed
     */
    get displayedChildren(){
        if(this._hiding){
            return [];
        }
        return this._displayChildren;
    }
    /**
     * returns children without triggering a new request
     */
    get loadedChildren(){
        return this._displayChildren;

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

    /**
     * This applies for all children regardless of _hidden
     * @param state whether the children of the tweet should be displayed
     */
    setHiding(state: boolean){
        this._hiding = state;
    }

    get isHiding(){
        return this._hiding;
    }

    get selected(){
        return this._selected;
    }


    select(){
       this._selected = true;
       this._selected_callback(true);
    }
    unSelect(){
        this._selected = false;
        this._selected_callback(false);
    }

    setSelectCallback(f: (select: boolean)=>void){
        this._selected_callback = f;
        //call, in case it wasn't up to date
        f(this._selected)
    }


    resetPosition(){
        this.position = {x:0, y:0};
        this.subtreeSpan = {startX: this.position.x, endX: this.position.x+this.dimension.width};
    }


    get displayDepth(): number{
        if(this._depth){
            return this._depth;
        }
        if(this.displayParent===null){
            this._depth = 0;
            return 0;
        }else{
            this._depth = this.displayParent.displayDepth;
        }
        return this._depth;
    }

    get referencedTweet(){
        return this._tweet;
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
    get profile_image() {
      return this._tweet.profile_image;
    }
}

export default DisplayTweet;
