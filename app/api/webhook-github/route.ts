import { NextResponse } from "next/server";
import { Webhooks, createNodeMiddleware } from "@octokit/webhooks";

// import

async function POST(request: Request) {
  try {
  } catch (error: unknown) {
    NextResponse.json({
      message:
        error instanceof Error
          ? error?.message
          : "Error in Github's webhook handler",
    });
  }
}
