import { RawTweet } from "src/commons/models/rawTweet";

export const DEFAULT_TWEET_UNWRAP_DEPTH = 3;


export function genTestTweet(){
    function* genId(){

        let id = 0;

        while(true){
            id++;
            yield id.toString()
        }
    }

    function getId(gen: Generator<string, any, any>): string{
        let next = gen.next()
        if(!next.done){
            return next.value
        }

        return "";

    }

    let id = genId();
    let root = new RawTweet(getId(id),"John","johny64", new Date(Date.now()), "Tweetoscope is down...",{retweet_count:1,reply_count:0,like_count:5,quote_count:0}, null)
    let rep1 = new RawTweet(getId(id),"Mark","m4rcus", new Date(Date.now()), "Yeah, for me too.", {retweet_count:0,reply_count:0,like_count:1,quote_count:0},root);
    let rep2 = new RawTweet(getId(id),"Henry","henr24", new Date(Date.now()), "Tweeto..what?", {retweet_count:0,reply_count:0,like_count:1,quote_count:0},root);
    root.debugAddReply(rep1)
    root.debugAddReply(rep2)

    return root;
}