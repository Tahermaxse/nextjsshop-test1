/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Notification` table. All the data in the column will be lost.
  - Made the column `userId` on table `Notification` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "updatedAt",
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "adminMessage" TEXT;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
