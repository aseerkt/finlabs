/*
  Warnings:

  - A unique constraint covering the columns `[authorId,name]` on the table `projects` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "projects_authorId_name_idx";

-- CreateIndex
CREATE UNIQUE INDEX "projects_authorId_name_key" ON "projects"("authorId", "name");
