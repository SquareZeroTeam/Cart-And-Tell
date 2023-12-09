/*
  Warnings:

  - Made the column `image` on table `Merchant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Merchant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryId` on table `Merchant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `proofOfAuthenticity` on table `Merchant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `merchantEndValidity` on table `Merchant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `merchantStartValidity` on table `Merchant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Merchant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Merchant" DROP CONSTRAINT "Merchant_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Merchant" DROP CONSTRAINT "Merchant_userId_fkey";

-- AlterTable
ALTER TABLE "Merchant" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "categoryId" SET NOT NULL,
ALTER COLUMN "proofOfAuthenticity" SET NOT NULL,
ALTER COLUMN "merchantEndValidity" SET NOT NULL,
ALTER COLUMN "merchantStartValidity" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Merchant" ADD CONSTRAINT "Merchant_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merchant" ADD CONSTRAINT "Merchant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
