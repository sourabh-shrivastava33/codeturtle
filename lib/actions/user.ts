"use server";

interface userObj {
  clerkId: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email: string;
}
async function createUser(user: userObj) {
  try {
  } catch (error) {
    console.log("Error Creating user", error);
  }
}
