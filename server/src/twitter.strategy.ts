import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from '@superfaceai/passport-twitter-oauth2';

import { Injectable } from '@nestjs/common';
import { AESCipher, AESDecipher } from './app.utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('CLIENTID'),
      clientSecret: configService.get('CLIENTSECRET'),
      callbackURL: configService.get('CALLBACKURL'),
      scope: [
        'tweet.read',
        'tweet.write',
        'tweet.moderate.write',
        'users.read',
        'follows.read',
        'follows.write',
        'offline.access',
        'space.read',
        'mute.read',
        'mute.write',
        'like.read',
        'like.write',
        'list.read',
        'list.write',
        'block.read',
        'block.write',
      ],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<{ token: any; refresh: any }> {
    // Encrypt Token and Refresh from there In AES-CBC
    let tokenAES = await AESCipher(accessToken, this.configService.get('KEY'));
    let refreshAES = await AESCipher(
      refreshToken,
      this.configService.get('KEY'),
    );
    return { token: tokenAES, refresh: refreshAES };
  }
}
