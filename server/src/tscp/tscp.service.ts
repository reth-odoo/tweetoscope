import { Injectable } from '@nestjs/common';

@Injectable()
export class TscpService {
  /**
   * should open editor window
   */
  writeTweet() {
    return 'yo';
  }

  /**
   * should send basic page i guess?
   * @returns
   */
  homePage() {
    return 'I Believe HERE IS THE WAY TO EVERYTHING';
  }
}
