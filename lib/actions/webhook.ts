import { encryptToken } from "../utils";
import { createGithubCreds } from "./github";
import { createUser } from "./user";
import { clerkClient } from "@clerk/express";
export async function handleUserCreate(data: any) {
  try {
    const userPayload = {
      clerkId: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data?.email_addresses[0]?.email_address,
      phone: data.phone_numbers[0]?.phone_number,
    };
    const githubData = data.external_accounts?.[0];
    if (!githubData)
      throw new Error(
        "Github Data missing. Try Signing Up with different account"
      );
    const user = await createUser(userPayload);

    if (!user) throw new Error("Something went wrong");
    const github_token = await getGithubAccessToken(user.clerkId);

    const encryptedToken = encryptToken(
      github_token!.token,
      process.env.MASTER_KEY!
    );
    const githubCredPayload = {
      userId: user.id,
      user_name: githubData?.username || "",
      email: githubData.email_address,
      access_token: encryptedToken || "",
    };
    const github = await createGithubCreds(githubCredPayload);
    return { github, user };
  } catch (error) {
    console.log("Error handling user create webhook", error);
  }
}

export async function getGithubAccessToken(userId: string) {
  try {
    const tokens = await clerkClient.users.getUserOauthAccessToken(
      userId,
      "github"
    );

    return tokens.data[0];
    // const tokens =
  } catch (error) {
    console.log("Error handling get github access token", error);
  }
}
