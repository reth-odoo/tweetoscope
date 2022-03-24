import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { response } from 'express';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    return 'Hello World!';
  }

  /**
   *
   * @param req the request, should  have a "user" set from passport as {token: str, refresh:str}
   * @returns what needs to be passed to the client (AES of the token(s))
   * @returns null if no "user" field or otherwise invalid request
   */
  receiveTokens(req) {
    if (!req.user) {
      return null;
    }
    //basically convert to something that can be put in a cookie here
    let secret = [
      req.user.token.encryptedText,
      req.user.token.iv,
      req.user.refresh.encryptedText,
      req.user.refresh.iv,
    ];

    response.cookie('auth-cookie', secret);
    return `
    <style>
      table, th, td {
        border:1px solid black;
      }
    </style>
    <table>
      <tr>
        <td>Token</td>
        <td>${req.user.token.encryptedText || 'no token'}</td>
      </tr>
      <tr>
        <td>Refresh</td>
        <td>${req.user.refresh.encryptedText || 'no refresh token'}</td>
      </tr>
    </table>`;
  }
}
