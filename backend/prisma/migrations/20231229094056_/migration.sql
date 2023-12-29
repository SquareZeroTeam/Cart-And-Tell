-- AlterTable
ALTER TABLE "Merchant" ADD COLUMN     "hasPaid" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "MerchantBankDetails" (
    "id" SERIAL NOT NULL,
    "mobileNumber" INTEGER,
    "nric" TEXT,
    "merchantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MerchantBankDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MerchantBankDetails_mobileNumber_key" ON "MerchantBankDetails"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "MerchantBankDetails_nric_key" ON "MerchantBankDetails"("nric");

-- CreateIndex
CREATE UNIQUE INDEX "MerchantBankDetails_merchantId_key" ON "MerchantBankDetails"("merchantId");

-- AddForeignKey
ALTER TABLE "MerchantBankDetails" ADD CONSTRAINT "MerchantBankDetails_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
