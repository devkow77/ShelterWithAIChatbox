/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MĘŻCZYZNA', 'KOBIETA');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('UŻYTKOWNIK', 'PRACOWNIK', 'ADMINISTRATOR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'MĘŻCZYZNA',
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'UŻYTKOWNIK';

-- DropEnum
DROP TYPE "ROLE";
