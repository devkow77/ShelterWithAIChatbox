/*
  Warnings:

  - The values [FOUND,AVAILABLE,ADOPTED] on the enum `AnimalStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AnimalStatus_new" AS ENUM ('SZUKA_DOMU', 'ZNALEZIONY', 'W_TRAKCIE_ADOPCJI', 'ADOPTOWANY');
ALTER TABLE "public"."Animal" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Animal" ALTER COLUMN "status" TYPE "AnimalStatus_new" USING ("status"::text::"AnimalStatus_new");
ALTER TYPE "AnimalStatus" RENAME TO "AnimalStatus_old";
ALTER TYPE "AnimalStatus_new" RENAME TO "AnimalStatus";
DROP TYPE "public"."AnimalStatus_old";
ALTER TABLE "Animal" ALTER COLUMN "status" SET DEFAULT 'ZNALEZIONY';
COMMIT;

-- AlterTable
ALTER TABLE "Animal" ALTER COLUMN "status" SET DEFAULT 'ZNALEZIONY';
