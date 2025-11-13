import { Prisma } from "@prisma/client";

const userSelect = {
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
} satisfies Prisma.UserSelect;

export type UserDataType = Prisma.UserGetPayload<{
  select: typeof userSelect;
}>;
