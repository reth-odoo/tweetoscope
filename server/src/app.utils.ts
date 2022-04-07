import { createCipheriv, randomBytes } from 'crypto';
import { createDecipheriv } from 'crypto';

/**
 *
 * @param mes should be token or refreshtoken string
 * @param key imported from .env
 * @returns Token encoded
 */
export async function AESCipher(mes, key) {
  // random bytes added

  //don't know what to do with the value, should it be constant ?
  const iv = randomBytes(16);

  // The key length is dependent on the algorithm.
  // In this case for aes256, it is 32 bytes.

  const cipher = createCipheriv('aes-256-cbc', key, iv);
  let encryptedText = cipher.update(mes, 'utf8', 'base64');
  encryptedText += cipher.final('base64');
  return { encryptedText, iv, key };
}

/**
 *
 * @param mes Message encrypted with a key and an IV in AES
 * @param iv 16 bytes we need to decode the secret
 * @returns Message decoded
 */
export function AESDecipher(mes, iv, key) {
  const decipher = createDecipheriv('aes-256-cbc', key, iv);
  const decryptedText = decipher.update(mes, 'base64', 'utf8');
  return decryptedText + decipher.final('utf8');
}
