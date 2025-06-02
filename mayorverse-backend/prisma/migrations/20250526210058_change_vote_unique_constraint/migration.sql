/*
  Warnings:

  - A unique constraint covering the columns `[userId,pollId,pollOptionId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Vote_userId_pollId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_pollId_pollOptionId_key" ON "Vote"("userId", "pollId", "pollOptionId");
