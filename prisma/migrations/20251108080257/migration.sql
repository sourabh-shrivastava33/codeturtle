/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `GithubCreds` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GithubCreds_userId_key" ON "GithubCreds"("userId");
