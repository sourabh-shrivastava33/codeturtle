"use server";

import "dotenv/config";
import { prisma } from "../prisma";
import { Octokit } from "@octokit/rest";
import { decryptToken } from "../utils";
import { GITHUB_CALLBACK_URL } from "@/constants/api/urls";
import { createGithubWebhook } from "./github/webhook";
import { createPr, fetchAllOpenPR } from "./github/pr";
import { RepositoriesCreate } from "../types/repositories";
import { throwNewError } from "../commonFunction";

export async function saveRepositories(data: RepositoriesCreate) {
  try {
    const repoName = data.name;
    const ownerName = data.owner_name;
    const encryptedAccessToken = data.encrypted_token;
    debugger;
    const access_token = decryptToken(
      encryptedAccessToken,
      process.env.MASTER_KEY!
    );
    const octokit = new Octokit({ auth: access_token });

    //1.) Create webhook for repo

    //   events to subscribe
    const events = ["pull_request"];

    const [webhookData, openPRs] = await Promise.all([
      createGithubWebhook(
        ownerName,
        repoName,
        GITHUB_CALLBACK_URL,
        events,
        octokit
      ),
      fetchAllOpenPR(ownerName, repoName, octokit),
    ]);

    const repoStoredData = await prisma.repositories.create({
      data: {
        name: data.name,
        github: { connect: { id: data.githubId } },
        repoId: data.repo_id,
        fullName: data.full_name,
        cloneUrl: data.clone_url,
        defaultBranch: data.default_branch,
        htmlUrl: data.html_url,
        ownerName,
        description: data.description,
        webhookId: webhookData!.data.id,
        isPrivate: data.is_private,
      },
    });
    let prStoredData;
    if (openPRs) prStoredData = await createPr(openPRs, repoStoredData.id);
    return {
      repo: repoStoredData,
      prs: prStoredData ?? [],
      webhook: webhookData!.data,
    };
  } catch (error) {
    throwNewError(
      error,
      `Something went wrong, Error:${JSON.stringify(error)}`
    );
  }
}

export async function fetchAllRepositories(githubId: string) {
  try {
    const userAllRepo = await prisma.repositories.findMany({
      where: { githubId },
      select: {
        id: true,
        name: true,
        createdAt: true,
        fullName: true,
        _count: {
          select: { pullRequests: true },
        },
      },
    });
    return userAllRepo;
  } catch (error) {
    throwNewError(
      error,
      `Something went wrong, Error:${JSON.stringify(error)}`
    );
  }
}
export async function fetchAllPrs(githubId: string) {
  try {
    const reposWithPrs = await prisma.repositories.findMany({
      where: { githubId },
      select: {
        id: true,
        fullName: true,
        pullRequests: true,
      },
    });

    // Flatten all PRs into one array
    const allPrs = reposWithPrs.flatMap((repo) =>
      repo.pullRequests.map((pr) => ({
        ...pr,
        repoName: repo.fullName,
      }))
    );

    return allPrs;
  } catch (error) {
    throw new Error(`Something went wrong: ${JSON.stringify(error)}`);
  }
}

export async function fetchRepositoryByRepoId(repoId: number) {
  try {
    const repository = await prisma.repositories.findFirst({
      where: { repoId: repoId },
    });
    return repository;
  } catch (error) {
    throw new Error(`Something went wrong: ${JSON.stringify(error)}`);
  }
}
