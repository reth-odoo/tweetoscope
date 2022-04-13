import {PublicMetrics, RawTweet} from "src/commons/models/rawTweet";

type tweet_format = {
    author_id: string,
    conversation_id: string,
    id: string, 
    created_at: Date, 
    referenced_tweets: Array<any>,
    text: string, 
    public_metrics: Object};

type user_data = [
    {id: string; 
    name: string; 
    username: string}];

type user_format = {
    [id: string] : {
        name: string; 
        username: string}
    };


function userParse(user_data: user_data): user_format{

    var formated_user_data: user_format = {};

    for (let i = 0; i < user_data.length; i++){
        formated_user_data[user_data[i].id] = user_data[i];
    }
    
    return formated_user_data;
}

/**
 * Turns tweet data into a RawTweet object, with no child
 * @param tweet_data 
 * @param user_data 
 * @returns A RawTweet representation of the tweet data
 */
function tweetParse(tweet_data: tweet_format, user_data: user_format): RawTweet{

    //get Parent tweet

    var origin = null;

    if (tweet_data.referenced_tweets){
        for (let i = 0; i < tweet_data.referenced_tweets.length; i++){
            if (tweet_data.referenced_tweets[i].type === 'replied_to'){
                origin = tweet_data.referenced_tweets[i].id;
            }
        }
    }

    //parse public metrics
    let metrics = tweet_data.public_metrics as PublicMetrics;

    let author = tweet_data.author_id;
    //TODO: add likes and number of retweets
    let tweet = new RawTweet(tweet_data.id, user_data[author].name, user_data[author].username, new Date(tweet_data.created_at), tweet_data.text, metrics)

    return tweet;
}

export { tweetParse, userParse }