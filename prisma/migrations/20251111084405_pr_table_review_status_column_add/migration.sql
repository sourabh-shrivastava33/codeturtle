/*
  Warnings:

  - You are about to drop the column `status` on the `pull_requests` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "reviewStatus" AS ENUM ('PENDING', 'REQUESTED_CHANGE', 'COMPLETED');

-- AlterTable
ALTER TABLE "pull_requests" DROP COLUMN "status",
ADD COLUMN     "reviewStatus" "reviewStatus" NOT NULL DEFAULT 'PENDING';
