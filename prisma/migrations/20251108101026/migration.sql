/*
  Warnings:

  - You are about to drop the column `webhookSecret` on the `Repositories` table. All the data in the column will be lost.
  - The `webhookId` column on the `Repositories` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Repositories" DROP COLUMN "webhookSecret",
DROP COLUMN "webhookId",
ADD COLUMN     "webhookId" INTEGER;
