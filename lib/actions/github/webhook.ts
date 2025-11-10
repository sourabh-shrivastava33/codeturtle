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
    debugger;
    const response = await octokitInstance.repos.createWebhook({
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
    return response;
  } catch (error) {
    throwNewError(error, "Error while creating webhook ");
  }
}
