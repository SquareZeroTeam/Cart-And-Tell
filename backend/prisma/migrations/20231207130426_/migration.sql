/*
  Warnings:

  - You are about to drop the column `brandEndValidity` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `brandId` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `brandRelationship` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `brandStartValidity` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MerchantRelation" AS ENUM ('MerchantOwner', 'ExclusiveDistributor', 'NonExclusiveDistributor');

-- DropForeignKey
ALTER TABLE "Merchant" DROP CONSTRAINT "Merchant_brandId_fkey";

-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "brandEndValidity",
DROP COLUMN "brandId",
DROP COLUMN "brandRelationship",
DROP COLUMN "brandStartValidity",
ADD COLUMN     "merchantEndValidity" TIMESTAMP(3),
ADD COLUMN     "merchantRelationship" "MerchantRelation" NOT NULL DEFAULT 'MerchantOwner',
ADD COLUMN     "merchantStartValidity" TIMESTAMP(3);

-- DropTable
DROP TABLE "Brand";

-- DropEnum
DROP TYPE "BrandRelation";
