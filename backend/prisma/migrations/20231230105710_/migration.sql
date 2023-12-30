/*
  Warnings:

  - Changed the type of `type` on the `CMS` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CMSType" AS ENUM ('AboutUs', 'ContactUs', 'Policy', 'Certifications', 'Ratings');

-- AlterTable
ALTER TABLE "CMS" DROP COLUMN "type",
ADD COLUMN     "type" "CMSType" NOT NULL;

-- DropEnum
DROP TYPE "CMSTitle";

-- CreateIndex
CREATE UNIQUE INDEX "CMS_type_key" ON "CMS"("type");
