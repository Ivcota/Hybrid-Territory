/*
  Warnings:

  - You are about to drop the `DNC` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DNC" DROP CONSTRAINT "DNC_territoryId_fkey";

-- DropForeignKey
ALTER TABLE "DNC" DROP CONSTRAINT "DNC_userId_fkey";

-- DropTable
DROP TABLE "DNC";

-- CreateTable
CREATE TABLE "DoNotCall" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "territoryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DoNotCall_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DoNotCall" ADD CONSTRAINT "DoNotCall_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoNotCall" ADD CONSTRAINT "DoNotCall_territoryId_fkey" FOREIGN KEY ("territoryId") REFERENCES "Territory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
