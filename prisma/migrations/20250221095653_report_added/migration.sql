-- CreateTable
CREATE TABLE "ReportComponent" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "imageUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "componentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ReportComponent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReportComponent_componentId_idx" ON "ReportComponent"("componentId");

-- CreateIndex
CREATE INDEX "ReportComponent_userId_idx" ON "ReportComponent"("userId");

-- AddForeignKey
ALTER TABLE "ReportComponent" ADD CONSTRAINT "ReportComponent_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Components"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportComponent" ADD CONSTRAINT "ReportComponent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
