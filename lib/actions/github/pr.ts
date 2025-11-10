import { throwNewError } from "@/lib/commonFunction";
import { prisma } from "@/lib/prisma";
import { PullRequestListItem, PullRequestType } from "@/lib/types/pr";
import { Octokit } from "@octokit/rest";

export async function fetchAllOpenPR(
  ownerName: string,
  repoName: string,
  octokitInstance: Octokit
): Promise<PullRequestListItem[] | undefined> {
  try {
    const { data: prData } = await octokitInstance.pulls.list({
      owner: ownerName,
      repo: repoName,
      state: "open",
    });
    return prData;
  } catch (error) {
    throwNewError(error, "Error while fetching open PRs");
  }
}

export async function createPr(
  data: PullRequestListItem[] | PullRequestListItem,
  repoId: string
) {
  const payload = createPrPayload(data, repoId);
  if (Array.isArray(data)) return batchPrCreate(payload as PullRequestType[]);
  else return null;
}

export function createPrPayload(
  prResp: PullRequestListItem | PullRequestListItem[],
  repoId: string
): PullRequestType | PullRequestType[] {
  const returnPayload = (data: PullRequestListItem) => {
    const pr = data;

    return {
      repositoryId: repoId,
      prNumber: pr.number,
      title: pr.title,
      description: pr.body ?? "",
      author: pr.user?.login || "",
      authorAvatar: pr?.user?.avatar_url || "",
      baseBranch: pr.base.ref,
      headBranch: pr.head.ref,

      htmlUrl: pr.html_url,
      createdAt: new Date(pr.created_at),
      updatedAt: new Date(pr.updated_at),
    };
  };
  if (Array.isArray(prResp)) return prResp.map(returnPayload);
  else return returnPayload(prResp);
}

export async function batchPrCreate(pr: PullRequestType[]) {
  try {
    const manyCreatedPR = await prisma.pullRequest.createMany({
      data: pr,
      skipDuplicates: true,
    });
    return manyCreatedPR;
  } catch (error) {
    throwNewError(error, "Error while creating pr db entry");
  }
}

export async function prCreate(pr: PullRequestType) {
  try {
    const createdPr = await prisma.pullRequest.create({
      data: pr,
    });
    return createdPr;
  } catch (error) {
    throwNewError(error, "Error while creating pr db entry");
  }
}
