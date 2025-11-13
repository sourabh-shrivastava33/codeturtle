/*
  Warnings:

  - A unique constraint covering the columns `[repoId]` on the table `Repositories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `repoId` to the `Repositories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Repositories" ADD COLUMN     "repoId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Repositories_repoId_key" ON "Repositories"("repoId");
