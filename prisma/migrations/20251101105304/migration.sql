/*
  Warnings:

  - Added the required column `access_token` to the `GithubCreds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `GithubCreds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `GithubCreds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GithubCreds" ADD COLUMN     "access_token" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "user_name" TEXT NOT NULL;
