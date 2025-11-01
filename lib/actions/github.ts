"use server";

import { prisma } from "../prisma";

interface CredsObj {
  userId: string;
  status?: boolean;
  user_name: string;
  email: string;
  access_token: string;
}
export async function createGithubCreds(creds: CredsObj) {
  try {
    const githubCred = await prisma.githubCreds.create({
      data: {
        userId: creds.userId,
        email: creds.email,
        status: creds.status,
        user_name: creds.user_name,
        access_token: creds.access_token,
      },
    });
    return githubCred;
  } catch (error) {
    console.log("Error while saving User's Github Cred", error);
  }
}
