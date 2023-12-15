/*
  Warnings:

  - You are about to drop the column `isNortified` on the `Merchant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "isNortified",
ADD COLUMN     "isNotified" BOOLEAN NOT NULL DEFAULT false;
