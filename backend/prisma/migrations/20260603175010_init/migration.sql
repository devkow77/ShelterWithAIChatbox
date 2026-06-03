/*
  Warnings:

  - You are about to drop the column `age` on the `Animal` table. All the data in the column will be lost.
  - Added the required column `dateOfBirth` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AnimalHealthStatus" AS ENUM ('ZDROWY', 'CHORY', 'ZARAŻONY', 'POTRZEBUJE_OPERACJI');

-- CreateEnum
CREATE TYPE "MedicalRecordType" AS ENUM ('WIZYTA', 'BADANIE', 'OPERACJA', 'SZCZEPIENIE', 'URAZ', 'INNE');

-- AlterEnum
ALTER TYPE "AdoptionStatus" ADD VALUE 'ZAKONCZONA';

-- DropIndex
DROP INDEX "Adoption_userId_animalId_key";

-- AlterTable
ALTER TABLE "Adoption" ADD COLUMN     "processedById" INTEGER;

-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "age",
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "healthStatus" "AnimalHealthStatus" NOT NULL DEFAULT 'ZDROWY',
ADD COLUMN     "nextVisitDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "adminNote" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "hasChildren" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasOtherAnimals" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isBanned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isFormFilled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "street" TEXT;

-- CreateTable
CREATE TABLE "Vet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "clinic" TEXT,

    CONSTRAINT "Vet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalRecord" (
    "id" SERIAL NOT NULL,
    "animalId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "type" "MedicalRecordType" NOT NULL,
    "vetId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicalRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_processedById_fkey" FOREIGN KEY ("processedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_vetId_fkey" FOREIGN KEY ("vetId") REFERENCES "Vet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
