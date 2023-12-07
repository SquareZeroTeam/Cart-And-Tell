/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Merchant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Merchant" DROP CONSTRAINT "Merchant_categoryId_fkey";

-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "categoryId";
