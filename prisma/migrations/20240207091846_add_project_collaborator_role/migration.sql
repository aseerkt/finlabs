-- CreateEnum
CREATE TYPE "CollaboratorRole" AS ENUM ('ADMIN', 'WRITE', 'READ');

-- AlterTable
ALTER TABLE "collaborators" ADD COLUMN     "role" "CollaboratorRole" NOT NULL DEFAULT 'WRITE';

-- DropEnum
DROP TYPE "ProjectStatus";

-- DropEnum
DROP TYPE "ProjectVisibility";
