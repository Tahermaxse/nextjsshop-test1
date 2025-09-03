/*
  Warnings:

  - You are about to drop the column `imageData` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `imageType` on the `Report` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "imageData",
DROP COLUMN "imageType";
