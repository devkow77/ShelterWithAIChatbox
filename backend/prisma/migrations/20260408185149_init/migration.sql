/*
  Warnings:

  - You are about to drop the column `img` on the `Animal` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AnimalStatus" AS ENUM ('FOUND', 'AVAILABLE', 'ADOPTED');

-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "img",
ADD COLUMN     "availableFrom" TIMESTAMP(3),
ADD COLUMN     "foundAt" TIMESTAMP(3),
ADD COLUMN     "foundLocation" TEXT,
ADD COLUMN     "status" "AnimalStatus" NOT NULL DEFAULT 'FOUND';
