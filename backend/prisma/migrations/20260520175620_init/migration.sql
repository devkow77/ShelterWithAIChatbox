/*
  Warnings:

  - Made the column `availableFrom` on table `Animal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `foundAt` on table `Animal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `foundLocation` on table `Animal` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Animal" ALTER COLUMN "availableFrom" SET NOT NULL,
ALTER COLUMN "foundAt" SET NOT NULL,
ALTER COLUMN "foundLocation" SET NOT NULL;
