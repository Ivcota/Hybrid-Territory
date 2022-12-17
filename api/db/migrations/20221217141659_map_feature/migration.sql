-- CreateTable
CREATE TABLE "MapFeature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL,
    "metadata" TEXT,
    "imageURL" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "territoryId" TEXT,

    CONSTRAINT "MapFeature_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MapFeature" ADD CONSTRAINT "MapFeature_territoryId_fkey" FOREIGN KEY ("territoryId") REFERENCES "Territory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
