/*
  Warnings:

  - A unique constraint covering the columns `[type,name,cityId,postId]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Tag_type_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Tag_type_name_cityId_postId_key" ON "Tag"("type", "name", "cityId", "postId");
