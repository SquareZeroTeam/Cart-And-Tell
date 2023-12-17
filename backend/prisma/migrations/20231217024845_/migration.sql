-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('Active', 'Removed', 'Banned');

-- CreateEnum
CREATE TYPE "merchantStatus" AS ENUM ('Pending', 'Accepted', 'Rejected', 'Removed', 'Banned');

-- AlterTable
ALTER TABLE "Merchant" ADD COLUMN     "status" "merchantStatus" NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'Active';
