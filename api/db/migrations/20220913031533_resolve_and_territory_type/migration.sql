-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "isResolved" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Territory" ADD COLUMN     "type" TEXT NOT NULL DEFAULT E'letter writing';
