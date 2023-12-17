/*
  Warnings:

  - The values [Accepted] on the enum `merchantStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "merchantStatus_new" AS ENUM ('Pending', 'Approved', 'Rejected', 'Removed', 'Banned');
ALTER TABLE "Merchant" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Merchant" ALTER COLUMN "status" TYPE "merchantStatus_new" USING ("status"::text::"merchantStatus_new");
ALTER TYPE "merchantStatus" RENAME TO "merchantStatus_old";
ALTER TYPE "merchantStatus_new" RENAME TO "merchantStatus";
DROP TYPE "merchantStatus_old";
ALTER TABLE "Merchant" ALTER COLUMN "status" SET DEFAULT 'Pending';
COMMIT;
