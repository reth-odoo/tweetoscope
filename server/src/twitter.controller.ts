import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { getRequest, postRequest} from './twitter_api_calls/twitter_api_call';
import { AESDecipher } from './app.utils';

@Controller('twitter')
export class TwitterController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTwitter(): any{
    return "Twitter"
  }

  @Get('secondTest')
  getSecondTest(): any{
    return "Hello Twitter"
  }

  /*
  Get from the API 1 single Tweet
  */
  @Post('getTweet')
  searchTweet(@Req() req: Request): Promise<any> {

    const baseURL = `https://api.twitter.com/2/tweets/${req.body.id}`;

    const auth_token = this.appService.decryptTokens(req);

    var params: string = "?";
    params += "tweet.fields=created_at,referenced_tweets,author_id,conversation_id,public_metrics";
    params += "&";
    params += "expansions=author_id,referenced_tweets.id";
    params += "&";
    params += "user.fields=name";

    const fullURL = baseURL+params;

    return getRequest(fullURL, auth_token);

  }; 
    
  /*
  Get from the API 1 User Timeline
  */
  @Post('userTimeline')
  searchUserTimeline(@Req() req: Request): Promise<any> {

    const baseURL = `https://api.twitter.com/2/users/${req.body.id}/tweets`;

    const auth_token = this.appService.decryptTokens(req);

    var params: string = "?";
    params += "tweet.fields=created_at,referenced_tweets,author_id,conversation_id,public_metrics";
    params += "&";
    params += "expansions=author_id,referenced_tweets.id";
    params += "&";
    params += "user.fields=name";
    if (req.body.p_token && req.body.p_token != "") {
      params += "&";
      params += `pagination_token=${req.body.p_token}`;
    }

    const fullURL = baseURL+params;

    return getRequest(fullURL, auth_token);

  }

  @Post('searchReplyTweets')
  searchReplyTweets(@Req() req: Request): Promise<any>{

    const baseURL = `https://api.twitter.com/2/tweets/search/recent`;

    const auth_token = this.appService.decryptTokens(req);

    var params: string = "?"; //Do not remove
    params += `query=conversation_id:${req.body.conversation_id} to:${req.body.user_id}`;
    params += "&";
    params += "tweet.fields=created_at,referenced_tweets,author_id,conversation_id,public_metrics";
    params += "&";
    params += "expansions=author_id,referenced_tweets.id";
    params += "&";
    params += "user.fields=name";
    params += "&";
    params += "max_results=100";
    params += "&";
    params += `since_id=${req.body.id}`;
    if (req.body.p_token && req.body.p_token != "") {
      params += "&";
      params += `next_token=${req.body.p_token}`;
    }

    const fullURL = baseURL+params;

    console.log("Full URL");
    console.log(fullURL);

    console.log("Req: ", req.body);

    return getRequest(fullURL, auth_token);

  }

  @Post('currentUser')
  currentUser(@Req() req: Request): Promise<any>{

    const auth_token = this.appService.decryptTokens(req);

    const baseURL = `https://api.twitter.com/2/users/me`;
    var params: string = "?"; //Do not remove
    params += "user.fields=profile_image_url,description,url";

    const fullURL = baseURL+params;

    return getRequest(fullURL,auth_token);

  }

  @Post('sendTweet')
  sendTweet(@Req() req: Request): Promise<any>{

    const auth_token = this.appService.decryptTokens(req);

    const baseURL = `https://api.twitter.com/2/tweets`;

    const body = {}

    console.log("Body Request:");
    console.log(body);

    body["text"]=`${req.body.text}`;
    if (req.body.quote_tweet_id && req.body.quote_tweet_id != ""){
      body["quote_tweet_id"]=`${req.body.quote_tweet_id}`;
    }
    if (req.body.in_reply_to_tweet_id && req.body.in_reply_to_tweet_id != ""){
      body["reply"]={
        "in_reply_to_tweet_id":`${req.body.in_reply_to_tweet_id}`
      };
    }

    console.log("Body Request:",body);

    const fullURL = baseURL;

    return postRequest(fullURL,auth_token,body);

  }

  @Post('getFollowers')
  getFollowers(@Req() req: Request): Promise<any>{

    const auth_token = this.appService.decryptTokens(req);

    const baseURL = `https://api.twitter.com/2/users/${req.body.id}/followers`;
    
    var params: string = "?"; //Do not remove
    params += "max_results=50";

    if (req.body.p_token && req.body.p_token != "") {
      params += "&";
      params += `pagination_token=${req.body.p_token}`;
    }

    const fullURL = baseURL+params;

    return getRequest(fullURL,auth_token);

  }

  @Post('mockup')
  mockup(@Req() req: Request): Promise<any>{

    const auth_token = this.appService.decryptTokens(req);

    const baseURL = `api route with some parameter ${req.body.something1} and ${req.body.something2}`;
    var params: string = "?"; //Do not remove
    params += "relevant parameter 1";
    params += "&"; 
    params += "relevant parameter 2"

    const fullURL = baseURL+params;

    return getRequest(fullURL);

  }

}