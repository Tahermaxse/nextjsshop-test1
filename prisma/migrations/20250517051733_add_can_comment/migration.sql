/*
  Warnings:

  - You are about to drop the column `displayName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profilePic` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "displayName",
DROP COLUMN "profilePic",
ADD COLUMN     "canComment" BOOLEAN NOT NULL DEFAULT true;
