/*
  Warnings:

  - You are about to drop the column `isAllowedMultipleChoices` on the `Poll` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Poll_postId_key";

-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "isAllowedMultipleChoices",
ADD COLUMN     "isMultiple" BOOLEAN NOT NULL DEFAULT false;
