/*
  Warnings:

  - The primary key for the `ClientConnected` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `int` on the `ClientConnected` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClientConnected" DROP CONSTRAINT "ClientConnected_pkey",
DROP COLUMN "int",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ClientConnected_pkey" PRIMARY KEY ("id");
