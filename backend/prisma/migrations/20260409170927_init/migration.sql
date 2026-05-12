/*
  Warnings:

  - You are about to drop the column `slug` on the `Animal` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Animal_slug_key";

-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "slug";
