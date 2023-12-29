-- DropForeignKey
ALTER TABLE "ClientConnected" DROP CONSTRAINT "ClientConnected_liveStreamId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "ClientConnected" ADD CONSTRAINT "ClientConnected_liveStreamId_fkey" FOREIGN KEY ("liveStreamId") REFERENCES "LiveStream"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;
