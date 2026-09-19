/*
  Warnings:

  - You are about to drop the column `brand` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerDay` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `price` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleNo` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_ownerId_fkey";

-- DropIndex
DROP INDEX "Vehicle_location_idx";

-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "location" TEXT;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "brand",
DROP COLUMN "imageUrl",
DROP COLUMN "location",
DROP COLUMN "pricePerDay",
DROP COLUMN "year",
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "vehicleNo" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
