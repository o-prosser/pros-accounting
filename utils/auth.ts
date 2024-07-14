import {env} from '@/env.mjs'

export const runtime = 'edge';

export async function pbkdf2(
  password: string,
  salt: string,
  iterations: number,
  keylen: number,
) {
  const enc = new TextEncoder();
  const passwordBuffer = enc.encode(password);
  const saltBuffer = enc.encode(salt);

  const importedKey = await crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"],
  );

  const derivedKeyBuffer = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBuffer,
      iterations: iterations,
      hash: "SHA-256",
    },
    importedKey,
    keylen * 8, // keylen in bits
  );

  const derivedKeyArray = new Uint8Array(derivedKeyBuffer);

  // Convert to HEX
  let hex = "";
  for (let i = 0; i < derivedKeyArray.length; i++) {
    hex += derivedKeyArray[i].toString(16).padStart(2, "0");
  }

  return hex;
}

const HASH_ITERATIONS = 10000

export const hashPassword = async (raw: string) => {
  const key = await pbkdf2(raw, env.SALT_KEY, HASH_ITERATIONS, 64);
  return key
}

export const isMatchingPassword = async (raw: string, hashed: string) => {
  const hash = await pbkdf2(raw, env.SALT_KEY, HASH_ITERATIONS, 64);
  return hashed === hash;
}