import CryptoJS from 'crypto-js';

import { config } from '../config';

/**
 * Converts plaintext to a encrypted hex string.
 * This is the same implementation of the RijndaelManaged Class in C#.
 * CryptoJs library provides us with all the Rijndael AES functionality.
 * Mode used is CBC (Cipher Block Chaining).
 * Padding is PKCS7 (Public-Key Cryptography Standards #7).
 * @param {string} plaintext - Text to encrypt
 * @param {string} key - Key is 256 bits in size (32 bytes)
 * @param {string} iv - Initial vector is 128 bits in size (16 bytes)
 * @returns {string} - Returns a hex string, converted from the WordArray
 */
export function encryptAES(plaintext, key = config.AESKey, iv = config.AESIv) {
  if (!(typeof plaintext === 'string' || typeof plaintext === 'number')) {
    return null;
  }

  if (typeof plaintext === 'number' && isNaN(plaintext)) {
    return null;
  }

  const encodedPlaintext = CryptoJS.enc.Utf8.parse(plaintext);
  const encodedKey = CryptoJS.enc.Utf8.parse(key);
  const encodedIV = CryptoJS.enc.Utf8.parse(iv);
  const encryptedData = CryptoJS.AES.encrypt(encodedPlaintext, encodedKey, {
    keySize: 256 / 8,
    iv: encodedIV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const cipherString = CryptoJS.enc.Hex.stringify(encryptedData.ciphertext);
  return cipherString.toUpperCase();
}

// console.log(encryptAES("359391"));

/**
 * Converts the encrypted hex string back to original using Rijndael AES method.
 * @param {string} encryptedHexString - Encrypted hex string
 * @param {string} key - Key is 256 bits in size (32 bytes)
 * @param {string} iv - Initial vector is 128 bits in size (16 bytes)
 * @returns {string} - Returns the plaintext
 */
export function decryptAES(
  encryptedHexString,
  key = config.AESKey,
  iv = config.AESIv
) {
  if (typeof encryptedHexString !== 'string') {
    return null;
  }

  const encodedCiphertext = CryptoJS.enc.Hex.parse(encryptedHexString);
  const encodedKey = CryptoJS.enc.Utf8.parse(key);
  const encodedIV = CryptoJS.enc.Utf8.parse(iv);
  const decryptedData = CryptoJS.AES.decrypt(
    {
      ciphertext: encodedCiphertext,
    },
    encodedKey,
    {
      keySize: 256 / 8,
      iv: encodedIV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  var decryptedStr = CryptoJS.enc.Utf8.stringify(decryptedData);

  // This means that the string provided for decryption was already a plainText
  if (typeof decryptedStr === 'string' && decryptedStr === '')
    return encryptedHexString;

  return decryptedStr;
}

// console.log(decryptAES("CB634F1056C46C31430031EDE8147A04"));
