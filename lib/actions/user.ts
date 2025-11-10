"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { Octokit } from "@octokit/rest";
import { decryptToken } from "../utils";
import "dotenv/config";
import { User } from "@prisma/client";
import { UserDataType } from "../types/user";
interface userObj {
  clerkId: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email: string;
}
export async function createUser(user: userObj) {
  try {
    const newUser = await prisma.user.create({
      data: {
        clerkId: user.clerkId,
        email: user.email,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
      },
    });
    return newUser;
  } catch (error) {
    console.log("Error Creating user", error);
  }
}

export async function fetchUserData(): Promise<UserDataType | null> {
  const userData = await currentUser();
  if (!userData) throw new Error("User not found");
  const user = await prisma.user.findFirst({
    where: { clerkId: userData.id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      email: true,
      phone: true,
      githubCreds: {
        select: {
          id: true,
          email: true,
          access_token: true,
          user_name: true,
        },
      },
    },
  });
  return user;
}

export async function getUserGithubData() {
  try {
    const userData = await fetchUserData();
    const encryptedAccessToken = userData!.githubCreds?.access_token;

    if (!encryptedAccessToken) throw new Error("Access token is required");

    const accessToken = decryptToken(
      encryptedAccessToken,
      process.env.MASTER_KEY!
    );

    const octokit = new Octokit({ auth: accessToken });

    const { data: user } = await octokit.users.getAuthenticated();
    const repos = await octokit.paginate(
      octokit.rest.repos.listForAuthenticatedUser,
      {
        visibility: "all",
        per_page: 100,
      }
    );
    return { user, repos };
  } catch (error) {
    console.error("Error fetching user's GitHub data:", error);
    throw error; // good practice to rethrow for caller handling
  }
}
