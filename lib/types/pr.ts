export interface PullRequestType {
  id?: string; // cuid generated in DB
  repositoryId: string; // foreign key to repository

  prNumber: number; // maps to pull.number
  title: string; // maps to pull.title
  description?: string; // maps to pull.body
  author: string; // maps to pull.user.login
  authorAvatar?: string; // maps to pull.user.avatar_url
  baseBranch: string; // maps to pull.base.ref
  headBranch: string; // maps to pull.head.ref
  htmlUrl: string; // maps to pull.html_url

  createdAt: Date; // pull.created_at
  updatedAt: Date; // pull.updated_at
}

import { Endpoints } from "@octokit/types";

type ListPullsResponse =
  Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"]["data"];
export type PullRequestListItem = ListPullsResponse[number];

export type ListReposResponse =
  Endpoints["GET /user/repos"]["response"]["data"];

// Type for a single repository item
export type RepositoryListItem = ListReposResponse[number];
