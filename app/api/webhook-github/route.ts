// app/api/webhook-github/route.ts
import { Webhooks } from "@octokit/webhooks";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Octokit } from "@octokit/rest";
import { auth } from "@clerk/nextjs/server";
import { fetchUserData } from "@/lib/actions/user";
import { fetchRepositoryByRepoId } from "@/lib/actions/repositories";
import { createPr } from "@/lib/actions/github/pr";

const GITHUB_WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;

if (!GITHUB_WEBHOOK_SECRET) {
  throw new Error("Missing GITHUB_WEBHOOK_SECRET in environment variables");
}

// Initialize Octokit Webhooks instance
const webhooks = new Webhooks({
  secret: GITHUB_WEBHOOK_SECRET,
});

export async function POST(req: Request) {
  try {
    // Read GitHub signature headers

    const headerPayload = await headers();
    const eventName = headerPayload.get("x-github-event");
    const signature = headerPayload.get("x-hub-signature-256");
    const deliveryId = headerPayload.get("x-github-delivery");

    if (!eventName || !signature || !deliveryId) {
      return NextResponse.json(
        { error: "Missing GitHub headers" },
        { status: 400 }
      );
    }

    // Raw body (needed for signature verification)
    const bodyText = await req.text();

    // Verify and parse the payload
    let payload;
    try {
      payload = webhooks.verifyAndReceive({
        id: deliveryId,
        name: eventName,
        payload: JSON.parse(bodyText),
        signature,
      });
    } catch (err) {
      console.error("GitHub webhook verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // If we reach here, webhook is verified ✅
    console.log("GitHub event received:", eventName);

    // Handle specific event types
    if (eventName === "pull_request") {
      const prPayload = JSON.parse(bodyText);
      const action = prPayload.action;
      const pr = prPayload.pull_request;
      console.log(`prPayload:${JSON.stringify(prPayload)}`);
      const repo = prPayload.repository;
      const repoStoredData = await fetchRepositoryByRepoId(repo.id);
      console.log(`PR #${pr.number} ${action} by ${pr.user.login}`);

      // Optional: Comment on the PR using Octokit
      if (action === "opened") {
        await createPr(pr, repoStoredData!.id);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("GitHub webhook error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
