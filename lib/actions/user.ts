"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

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
