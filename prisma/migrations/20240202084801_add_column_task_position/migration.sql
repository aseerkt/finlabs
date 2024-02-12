/*
  Warnings:

  - You are about to drop the column `status` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `visibility` on the `projects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projectId,position]` on the table `columns` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[columnId,position]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `position` to the `columns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "columns" ADD COLUMN     "position" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "status",
DROP COLUMN "visibility",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "position" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "columns_projectId_position_key" ON "columns"("projectId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_columnId_position_key" ON "tasks"("columnId", "position");
