import { Controller, Get } from '@nestjs/common';
import { TscpService } from './tscp.service';

@Controller()
export class TscpController {
  constructor(private readonly tscpService: TscpService) {}

  /**
   * home route where we should see basic tweet and search bar
   * @returns
   */
  @Get('home')
  homePage() {
    return this.tscpService.homePage();
  }

  /**
   * editor route will be the route where user can edit a tweet
   */
  @Get('editor')
  writeTweet(): string {
    return this.tscpService.writeTweet();
  }
}
