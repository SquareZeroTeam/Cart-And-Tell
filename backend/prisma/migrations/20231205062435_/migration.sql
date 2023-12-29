-- CreateEnum
CREATE TYPE "BrandRelation" AS ENUM ('BrandOwner', 'ExclusiveDistributor', 'NonExclusiveDistributor');

-- AlterTable
ALTER TABLE "Merchant" ADD COLUMN     "brandEndValidity" TIMESTAMP(3),
ADD COLUMN     "brandRelationship" "BrandRelation" NOT NULL DEFAULT 'BrandOwner',
ADD COLUMN     "brandStartValidity" TIMESTAMP(3),
ADD COLUMN     "proofOfAuthenticity" TEXT;
