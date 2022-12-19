/*
  Warnings:

  - Added the required column `commentAuthorId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "commentAuthorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentAuthorId_fkey" FOREIGN KEY ("commentAuthorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
