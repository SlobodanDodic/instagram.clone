-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_commentAuthorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentAuthorId_fkey" FOREIGN KEY ("commentAuthorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
