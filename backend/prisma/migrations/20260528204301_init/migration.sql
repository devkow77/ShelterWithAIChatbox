-- CreateEnum
CREATE TYPE "AdoptionStatus" AS ENUM ('OCZEKUJACA', 'ZAAKCEPTOWANA', 'ODRZUCONA', 'ANULOWANA');

-- CreateTable
CREATE TABLE "Adoption" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "animalId" INTEGER NOT NULL,
    "status" "AdoptionStatus" NOT NULL DEFAULT 'OCZEKUJACA',
    "message" TEXT,
    "employeeNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Adoption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Adoption_userId_animalId_key" ON "Adoption"("userId", "animalId");

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
