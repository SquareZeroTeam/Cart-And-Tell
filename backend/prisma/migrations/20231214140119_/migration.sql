/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `LiveStream` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Message_liveStreamRoomId_key";

-- AlterTable
ALTER TABLE "LiveStream" ADD COLUMN     "productId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "LiveStream_productId_key" ON "LiveStream"("productId");

-- AddForeignKey
ALTER TABLE "LiveStream" ADD CONSTRAINT "LiveStream_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
