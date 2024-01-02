-- CreateTable
CREATE TABLE "CartAndTellBankDetails" (
    "id" SERIAL NOT NULL,
    "accountNo" TEXT NOT NULL,
    "uen" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CartAndTellBankDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchantRegistrationTransaction" (
    "id" SERIAL NOT NULL,
    "merchantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "merchantRegistrationTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CartAndTellBankDetails_accountNo_key" ON "CartAndTellBankDetails"("accountNo");

-- CreateIndex
CREATE UNIQUE INDEX "CartAndTellBankDetails_uen_key" ON "CartAndTellBankDetails"("uen");

-- CreateIndex
CREATE UNIQUE INDEX "CartAndTellBankDetails_mobileNumber_key" ON "CartAndTellBankDetails"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "CartAndTellBankDetails_sessionToken_key" ON "CartAndTellBankDetails"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "merchantRegistrationTransaction_merchantId_key" ON "merchantRegistrationTransaction"("merchantId");

-- AddForeignKey
ALTER TABLE "merchantRegistrationTransaction" ADD CONSTRAINT "merchantRegistrationTransaction_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
