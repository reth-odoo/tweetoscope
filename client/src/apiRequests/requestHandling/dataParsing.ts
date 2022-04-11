import RawTweet from "../../commons/models/rawTweet";

type tweet_format = {
    author_id: string,
    conversation_id: string,
    id: string, 
    created_at: Date, 
    referenced_tweets: Array<any>,
    text: string, };

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

    var tweet = new RawTweet(
        tweet_data.id, 
        user_data[tweet_data.author_id].name, 
        user_data[tweet_data.author_id].username, 
        tweet_data.created_at, 
        tweet_data.text,
        origin);

    return tweet;
}

export { tweetParse, userParse }