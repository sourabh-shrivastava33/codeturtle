/*
  Warnings:

  - Added the required column `description` to the `Repositories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Repositories" ADD COLUMN     "description" TEXT NOT NULL;
