/*
  Warnings:

  - Added the required column `address` to the `DoNotCall` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DoNotCall" ADD COLUMN     "address" TEXT NOT NULL;
