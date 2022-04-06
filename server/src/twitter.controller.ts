import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import routeRequest from './twitter_api_calls/twitter_api_call';

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

  @Post('getTweet')
  searchTweet(@Req() req: Request): Promise<any> {

    const baseURL = `https://api.twitter.com/2/tweets/${req.body.id}`;

    var params: string = "?";
    params += "tweet.fields=lang,author_id";
    params += "&"
    params += "user.fields=created_at";

    const fullURL = baseURL+params;

    return routeRequest(fullURL);

    }; 
    

  @Post('userTimeline')
  searchUserTimeline(@Req() req: Request): Promise<any> {

    const baseURL = `https://api.twitter.com/2/users/${req.body.id}/tweets`;

    var params: string = "?";
    params += "tweet.fields=lang,author_id";
    params += "&"
    params += "user.fields=created_at";
    if (req.body.p_token != "") {
      params += `&pagination_token=${req.body.p_token}`;
    }

    const fullURL = baseURL+params;

    return routeRequest(fullURL);

  }

  @Post('mockup')
  mockup(@Req() req: Request): Promise<any>{

  const baseURL = `api route with some parameter ${req.body.something1} and ${req.body.something2}`;
  var params: string = "?"; //Do not remove
  params += "relevant parameter 1";
  params += "&"; 
  params += "relevant parameter 2"

  const fullURL = baseURL+params;

  return routeRequest(fullURL);

  }

}