import { throwNewError } from "@/lib/commonFunction";
import { Octokit } from "@octokit/rest";

export async function createGithubWebhook(
  owner: string,
  repoName: string,
  callBackUrl: string,
  events: string[],
  octokitInstance: Octokit
) {
  console.log(`Started creating webhook for ${repoName}`);

  try {
    if (!Array.isArray(events) || !events.length)
      throw new Error("Pass right set of events");

    // First, check if a webhook with this URL already exists
    const { data: existingHooks } = await octokitInstance.repos.listWebhooks({
      owner: owner,
      repo: repoName,
    });

    const existingHook = existingHooks.find(
      (hook) => hook.config.url === callBackUrl
    );

    let response;

    if (existingHook) {
      // Update existing webhook
      console.log(
        `Webhook already exists (ID: ${existingHook.id}), updating...`
      );
      response = await octokitInstance.repos.updateWebhook({
        owner: owner,
        repo: repoName,
        hook_id: existingHook.id,
        config: {
          url: callBackUrl,
          content_type: "json",
          secret: process.env.GITHUB_WEBHOOK_SECRET,
        },
        events: events,
      });
      console.log(`Webhook Updated`);
    } else {
      // Create new webhook
      response = await octokitInstance.repos.createWebhook({
        owner: owner,
        repo: repoName,
        config: {
          url: callBackUrl,
          content_type: "json",
          secret: process.env.GITHUB_WEBHOOK_SECRET,
        },
        events: events,
      });
      console.log(`Webhook Created`);
    }

    return response;
  } catch (error) {
    throwNewError(error, "Error while creating/updating webhook");
  }
}
