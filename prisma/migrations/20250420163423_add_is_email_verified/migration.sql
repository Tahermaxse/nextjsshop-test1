/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- First add the columns with default values
ALTER TABLE "User" ADD COLUMN "isEmailVerified" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "User" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Update isEmailVerified based on emailVerified field
UPDATE "User" SET "isEmailVerified" = true WHERE "emailVerified" IS NOT NULL;

-- Remove the default values
ALTER TABLE "User" ALTER COLUMN "createdAt" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "updatedAt" DROP DEFAULT;
