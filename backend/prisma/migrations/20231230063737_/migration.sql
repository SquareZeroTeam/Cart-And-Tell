/*
  Warnings:

  - A unique constraint covering the columns `[uen]` on the table `MerchantBankDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "CMSTitle" AS ENUM ('AboutUs', 'Policy', 'ContactUs', 'Certifications', 'Ratings');

-- AlterTable
ALTER TABLE "MerchantBankDetails" ADD COLUMN     "isCorporate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "uen" TEXT,
ALTER COLUMN "mobileNumber" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "CMS" (
    "id" SERIAL NOT NULL,
    "type" "CMSTitle" NOT NULL,
    "html" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CMS_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CMS_type_key" ON "CMS"("type");

-- CreateIndex
CREATE UNIQUE INDEX "MerchantBankDetails_uen_key" ON "MerchantBankDetails"("uen");
