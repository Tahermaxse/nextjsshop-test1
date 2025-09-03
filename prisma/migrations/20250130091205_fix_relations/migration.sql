/*
  Warnings:

  - You are about to drop the column `isEmailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verificationCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verificationCodeExpiry` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,componentId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_templateId_fkey";

-- AlterTable
ALTER TABLE "Feature" ADD COLUMN     "componentId" INTEGER,
ALTER COLUMN "templateId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "componentId" INTEGER,
ALTER COLUMN "templateId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "componentId" INTEGER,
ALTER COLUMN "templateId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "componentId" INTEGER,
ALTER COLUMN "templateId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isEmailVerified",
DROP COLUMN "verificationCode",
DROP COLUMN "verificationCodeExpiry";

-- CreateTable
CREATE TABLE "Components" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "author" TEXT NOT NULL,
    "authorUrl" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "views" INTEGER NOT NULL,
    "pages" INTEGER NOT NULL,
    "categories" TEXT[],
    "pagesList" TEXT[],
    "preview" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "paragraph1" TEXT,
    "paragraph2" TEXT,
    "urlname" TEXT NOT NULL,
    "videos" TEXT[],

    CONSTRAINT "Components_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_userId_componentId_key" ON "Purchase"("userId", "componentId");

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Components"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Components"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Components"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Components"("id") ON DELETE SET NULL ON UPDATE CASCADE;
