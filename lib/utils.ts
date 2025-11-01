import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // 96 bits - recommended for GCM
const KEY_LENGTH = 32; // 256 bits
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function normalizeKey(masterKeyHex: Buffer | string) {
  if (!masterKeyHex) throw new Error("masterKey is required");
  if (Buffer.isBuffer(masterKeyHex)) {
    if (masterKeyHex.length !== KEY_LENGTH)
      throw new Error("Master key buffer must be 32 bytes");
    return masterKeyHex;
  }
  if (typeof masterKeyHex !== "string")
    throw new Error("Master key must be a hex string or Buffer");
  const buf = Buffer.from(masterKeyHex, "hex");
  if (buf.length !== KEY_LENGTH)
    throw new Error("Master key hex must represent 32 bytes (64 hex chars)");
  return buf;
}

export function encryptToken(plaintext: string, masterKeyHex: Buffer | string) {
  if (typeof plaintext !== "string")
    throw new Error("plaintext must be a string");
  const key = normalizeKey(masterKeyHex);
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv, {
    authTagLength: 16,
  });

  const ciphertext = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  // Pack as: iv (12) | tag (16) | ciphertext (variable)
  const payload = Buffer.concat([iv, tag, ciphertext]);
  return payload.toString("base64");
}

export function decryptToken(
  encryptedBase64: string,
  masterKeyHex: Buffer | string
) {
  if (typeof encryptedBase64 !== "string")
    throw new Error("encryptedBase64 must be a string");
  const key = normalizeKey(masterKeyHex);
  const payload = Buffer.from(encryptedBase64, "base64");

  const iv = payload.slice(0, IV_LENGTH);
  const tag = payload.slice(IV_LENGTH, IV_LENGTH + 16);
  const ciphertext = payload.slice(IV_LENGTH + 16);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv, {
    authTagLength: 16,
  });
  decipher.setAuthTag(tag);
  const plaintext = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);
  return plaintext.toString("utf8");
}
