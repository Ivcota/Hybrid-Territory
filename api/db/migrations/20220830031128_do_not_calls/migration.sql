-- AlterTable
ALTER TABLE "User" ALTER COLUMN "roles" SET DEFAULT E'deactivated';

-- CreateTable
CREATE TABLE "DNC" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "territoryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DNC_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DNC" ADD CONSTRAINT "DNC_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DNC" ADD CONSTRAINT "DNC_territoryId_fkey" FOREIGN KEY ("territoryId") REFERENCES "Territory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;