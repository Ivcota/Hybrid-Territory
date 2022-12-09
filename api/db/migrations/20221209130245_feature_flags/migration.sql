-- CreateTable
CREATE TABLE "FeatureFlag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeatureFlag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FeatureFlagToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FeatureFlagToUser_AB_unique" ON "_FeatureFlagToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FeatureFlagToUser_B_index" ON "_FeatureFlagToUser"("B");

-- AddForeignKey
ALTER TABLE "_FeatureFlagToUser" ADD CONSTRAINT "_FeatureFlagToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "FeatureFlag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeatureFlagToUser" ADD CONSTRAINT "_FeatureFlagToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
