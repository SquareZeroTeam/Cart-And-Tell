-- DropForeignKey
ALTER TABLE "ClientConnected" DROP CONSTRAINT "ClientConnected_liveStreamId_fkey";

-- AddForeignKey
ALTER TABLE "ClientConnected" ADD CONSTRAINT "ClientConnected_liveStreamId_fkey" FOREIGN KEY ("liveStreamId") REFERENCES "LiveStream"("roomId") ON DELETE CASCADE ON UPDATE CASCADE;
