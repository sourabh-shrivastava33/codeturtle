import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import { Webhook } from "svix";
import "dotenv/config";
import type { WebhookEvent } from "@clerk/nextjs/server";
export async function webhookHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  try {
    if (!CLERK_WEBHOOK_SECRET)
      throw new Error("Add clerk webhook secret to your codebase");

    const buf = await buffer(req);
    const payload = buf.toString("utf-8");

    // Get Svix headers
    const svix_id = req.headers["svix-id"] as string;
    const svix_timestamp = req.headers["svix-timestamp"] as string;
    const svix_signature = req.headers["svix-signature"] as string;

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({ error: "Missing svix headers" });
    }
    const headers = {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    };

    const wh = new Webhook(CLERK_WEBHOOK_SECRET);
    let event;
    try {
      event = wh.verify(payload, headers) as WebhookEvent;
    } catch (error) {
      console.log("Error verifying the webhook coming from the Clerk", error);
      return res.status(400).json({ error: "Webhook verification failed" });
    }

    // Handle events
    switch (event.type) {
      case "user.created":
        console.log("User created");
        break;
      case "user.updated":
        break;
      case "user.deleted":
        break;
      default:
        console.log("Unhandled event type:", event.type);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.log("Error verifying the webhook coming from the Clerk", error);
    return res.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : `Something went wrong: Error ${error}`,
    });
  }
}
