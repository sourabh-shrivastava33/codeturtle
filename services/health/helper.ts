"use server";

import { prisma } from "@/lib/prisma";

export async function checkDbRunning() {
  try {
    const res = await prisma.$queryRaw`SELECT 1`;
    console.log("Db is connected successfully");

    return {
      name: "db",
      message: `Your Db Connected Successfully`,
      success: true,
    };
  } catch (error) {
    return {
      message: `Your Db is Currently Down, Error:${JSON.stringify(error)}`,
      success: false,
    };
  }
}

export async function checkGithubRunning() {
  try {
    const res = await fetch("https://api.github.com/users/octocat");

    if (!res.ok) throw new Error("GitHub API not reachable");

    return {
      name: "github",
      message: `Github working fine`,
      success: true,
    };
  } catch (error) {
    return {
      message: `Github is currently down, Error:${JSON.stringify(error)}`,
      success: false,
    };
  }
}
