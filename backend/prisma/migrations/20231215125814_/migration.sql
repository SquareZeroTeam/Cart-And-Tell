/*
  Warnings:

  - You are about to drop the column `isNotified` on the `Merchant` table. All the data in the column will be lost.
  - Made the column `proofOfAuthenticity` on table `Merchant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "isNotified",
ALTER COLUMN "proofOfAuthenticity" SET NOT NULL;

-- CreateTable
CREATE TABLE "LiveStream" (
    "roomId" TEXT NOT NULL,
    "merchantId" INTEGER NOT NULL,
    "productId" INTEGER,

    CONSTRAINT "LiveStream_pkey" PRIMARY KEY ("roomId")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "liveStreamRoomId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LiveStream_merchantId_key" ON "LiveStream"("merchantId");

-- CreateIndex
CREATE UNIQUE INDEX "LiveStream_productId_key" ON "LiveStream"("productId");

-- AddForeignKey
ALTER TABLE "LiveStream" ADD CONSTRAINT "LiveStream_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiveStream" ADD CONSTRAINT "LiveStream_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_liveStreamRoomId_fkey" FOREIGN KEY ("liveStreamRoomId") REFERENCES "LiveStream"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
