/*
  Warnings:

  - The values [MĘŻCZYZNA] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - The values [UŻYTKOWNIK] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The `type` column on the `Animal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `gender` column on the `Animal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `size` column on the `Animal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AnimalType" AS ENUM ('PIES', 'KOT', 'KROLIK', 'CHOMIK', 'ZOLW', 'INNE');

-- CreateEnum
CREATE TYPE "AnimalGender" AS ENUM ('SAMICA', 'SAMIEC');

-- CreateEnum
CREATE TYPE "AnimalSize" AS ENUM ('MALY', 'SREDNI', 'DUZY');

-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('MEZCZYZNA', 'KOBIETA');
ALTER TABLE "public"."User" ALTER COLUMN "gender" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "public"."Gender_old";
ALTER TABLE "User" ALTER COLUMN "gender" SET DEFAULT 'MEZCZYZNA';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('UZYTKOWNIK', 'PRACOWNIK', 'ADMINISTRATOR');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'UZYTKOWNIK';
COMMIT;

-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "type",
ADD COLUMN     "type" "AnimalType" NOT NULL DEFAULT 'INNE',
DROP COLUMN "gender",
ADD COLUMN     "gender" "AnimalGender" NOT NULL DEFAULT 'SAMIEC',
DROP COLUMN "size",
ADD COLUMN     "size" "AnimalSize" NOT NULL DEFAULT 'SREDNI';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "gender" SET DEFAULT 'MEZCZYZNA',
ALTER COLUMN "role" SET DEFAULT 'UZYTKOWNIK';
