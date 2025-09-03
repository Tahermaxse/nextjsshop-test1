-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "componentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "commentId" INTEGER NOT NULL,

    CONSTRAINT "CommentImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentReaction" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "commentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateComment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "templateId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "TemplateComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateCommentImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "commentId" INTEGER NOT NULL,

    CONSTRAINT "TemplateCommentImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateCommentReaction" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "commentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TemplateCommentReaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Comment_componentId_idx" ON "Comment"("componentId");

-- CreateIndex
CREATE INDEX "Comment_userId_idx" ON "Comment"("userId");

-- CreateIndex
CREATE INDEX "Comment_parentId_idx" ON "Comment"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "CommentReaction_userId_commentId_key" ON "CommentReaction"("userId", "commentId");

-- CreateIndex
CREATE INDEX "TemplateComment_templateId_idx" ON "TemplateComment"("templateId");

-- CreateIndex
CREATE INDEX "TemplateComment_userId_idx" ON "TemplateComment"("userId");

-- CreateIndex
CREATE INDEX "TemplateComment_parentId_idx" ON "TemplateComment"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "TemplateCommentReaction_userId_commentId_key" ON "TemplateCommentReaction"("userId", "commentId");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Components"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentImage" ADD CONSTRAINT "CommentImage_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReaction" ADD CONSTRAINT "CommentReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReaction" ADD CONSTRAINT "CommentReaction_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateComment" ADD CONSTRAINT "TemplateComment_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateComment" ADD CONSTRAINT "TemplateComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateComment" ADD CONSTRAINT "TemplateComment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "TemplateComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateCommentImage" ADD CONSTRAINT "TemplateCommentImage_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "TemplateComment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateCommentReaction" ADD CONSTRAINT "TemplateCommentReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateCommentReaction" ADD CONSTRAINT "TemplateCommentReaction_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "TemplateComment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
