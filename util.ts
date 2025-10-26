import crypto from "crypto";
import "dotenv/config";
const ALGORITHM = "aes-256-cbc";
const KEY = process.env.ENCRYPTION_KEY;
if (!KEY) {
  throw new Error("ENCRYPTION_KEY is not set in environment variables.");
}

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16); // unique per encryption
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(KEY!, "utf8"),
    iv
  );

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
}

export function decrypt(encryptedData: string): string {
  const [ivHex, encrypted] = encryptedData.split(":");
  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(KEY!, "utf8"),
    iv
  );

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
