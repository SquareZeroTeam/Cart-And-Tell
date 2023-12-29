/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `ProductItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductItem_productId_key" ON "ProductItem"("productId");
