import { Octokit } from "@octokit/rest";
import { tool } from "@openai/agents";
import { z } from "zod";
import { prisma } from "../prisma";

export const FetchRepoContentTool = tool({
  name: "fetch_repo_content",
  description: "Fetched the content of a repository file from github",
  parameters: z.object({
    owner: z.string().describe("Owner of the repo"),
    repoName: z.string(),
    filePath: z.string().describe("Path of the file in Github Repository"),
  }),
  execute: async ({ owner, repoName, filePath }) => {
    try {
      const octokit = new Octokit({ auth: process.env.GITHUB_TEST_TOKEN });
      const { data } = await octokit.repos.getContent({
        owner,
        repo: repoName,
        path: filePath,
      });

      if ("content" in data && typeof data.content === "string") {
        return Buffer.from(data.content, "base64").toString("utf8");
      }
      return "File is empty";
    } catch (error) {
      console.log(`Error fetching repo content: ${error}`);
    }
  },
});

export const FetchPrDiff = tool({
  name: "fetch_pr_diff",
  description: "Fetch the diff of a pull request from Github",
  parameters: z.object({
    owner: z.string().describe("Owner of the repo"),
    repoName: z.string(),
    pull_number: z.number().describe("The PR number to fetch the diff for"),
  }),
  execute: async ({ owner, repoName, pull_number }) => {
    try {
      const octokit = new Octokit({ auth: process.env.GITHUB_TEST_TOKEN });
      const { data: prDiff } = await octokit.rest.pulls.get({
        owner: owner,
        repo: repoName,
        pull_number: pull_number,
        mediaType: {
          format: "diff",
        },
      });

      return prDiff.body || "File is empty";
    } catch (error) {
      console.log(`Error fetching repo content: ${error}`);
    }
  },
});

export const FetchFileCommitHistory = tool({
  name: "fetch_file_commit_history",
  description: "Fetch the commit history of a file from Github",
  parameters: z.object({
    owner: z.string().describe("Owner of the repo"),
    repoName: z.string(),
    path: z.string().describe("The file path to fetch the commit history for"),
  }),
  execute: async ({ owner, repoName, path }) => {
    try {
      const octokit = new Octokit({ auth: process.env.GITHUB_TEST_TOKEN });
      const { data } = await octokit.rest.repos.listCommits({
        owner: owner,
        repo: repoName,
        path: path,
      });

      return JSON.stringify(
        data.map((c: any) => ({
          message: c.commit.message,
          author: c.commit.author.name,
          date: c.commit.author.date,
        }))
      );
    } catch (error) {
      return `Error fetching history: ${(error as any).message}`;
    }
  },
});

export const PrCommitTool = tool({
  name: "commit_pr_changes",
  description: "Commit changes to a pull request on Github",
  parameters: z.object({
    owner: z.string().describe("Owner of the repo"),
    repoName: z.string(),
    path: z.string().describe("The file path to fetch the commit history for"),
    startLine: z.number().describe("The starting line number of the change"),
    endLine: z.number().describe("The ending line number of the change"),
    replacementCode: z
      .string()
      .describe("The new content to be added in the file"),
    commitMessage: z.string().describe("The commit message for the change"),
    approvalToken: z
      .string()
      .describe("Human approval token to authorize the commit"),
  }),
  execute: async ({
    owner,
    path,
    repoName,
    startLine,
    endLine,
    replacementCode,
    commitMessage,
    approvalToken,
  }) => {
    try {
      const approval = await prisma.approval.findUnique({
        where: { token: approvalToken },
      });
      if (!approval || approval.expiresAt < new Date()) {
        throw new Error("Invalid or expired approval token");
      }

      const octokit = new Octokit({ auth: process.env.GITHUB_TEST_TOKEN });
      const { data: fileContent } = await octokit.repos.getContent({
        owner,
        repo: repoName,
        path,
      });
      let currentFileContent = "";
      if ("content" in fileContent && typeof fileContent.content == "string")
        currentFileContent = Buffer.from(
          fileContent.content,
          "base64"
        ).toString("utf8");

      if (!currentFileContent) throw new Error("File is empty");
      const fileLines = currentFileContent.split("/n");
      const newFileLines = [
        ...fileLines.slice(0, startLine - 1),
        replacementCode,
        ...fileLines.slice(endLine),
      ];

      const updatedFileContent = newFileLines.join("/n");

      // Create commit
      const { data: commit } = await octokit.repos.createOrUpdateFileContents({
        owner,
        repo: repoName,
        path,
        message: commitMessage,
        content: Buffer.from(updatedFileContent).toString("base64"),
        branch: (fileContent as any).ref,
      });

      return JSON.stringify({
        success: true,
        commitSha: commit.commit.sha,
        linesModified: endLine - startLine + 1,
      });
    } catch (error) {
      return `Error validating approval token: ${(error as any).message}`;
    }
  },
});
