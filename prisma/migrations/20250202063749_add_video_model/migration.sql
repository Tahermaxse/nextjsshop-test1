/*
  Warnings:

  - You are about to drop the column `videos` on the `Components` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Components" DROP COLUMN "videos";

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "src" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "componentId" INTEGER NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Components"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
