/*
  Warnings:

  - Changed the type of `agentType` on the `ai_suggestions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AIAgentType" AS ENUM ('CODE_QUALITY', 'SECURITY', 'PERFORMANCE', 'STYLE');

-- AlterTable
ALTER TABLE "ai_suggestions" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "handOffReason" TEXT,
ADD COLUMN     "handoffFrom" TEXT,
ADD COLUMN     "handoffTo" TEXT,
ADD COLUMN     "startedAt" TIMESTAMP(3),
DROP COLUMN "agentType",
ADD COLUMN     "agentType" "AIAgentType" NOT NULL;
