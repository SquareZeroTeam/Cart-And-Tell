/*
  Warnings:

  - Made the column `categoryId` on table `Merchant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Merchant" DROP CONSTRAINT "Merchant_categoryId_fkey";

-- AlterTable
ALTER TABLE "Merchant" ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Merchant" ADD CONSTRAINT "Merchant_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
