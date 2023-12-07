-- AlterTable
ALTER TABLE "Merchant" ADD COLUMN     "categoryId" INTEGER NOT NULL DEFAULT 100;

-- AddForeignKey
ALTER TABLE "Merchant" ADD CONSTRAINT "Merchant_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
