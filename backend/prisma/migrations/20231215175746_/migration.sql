/*
  Warnings:

  - A unique constraint covering the columns `[liveStreamId]` on the table `ClientConnected` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roomId]` on the table `LiveStream` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ClientConnected_liveStreamId_key" ON "ClientConnected"("liveStreamId");

-- CreateIndex
CREATE UNIQUE INDEX "LiveStream_roomId_key" ON "LiveStream"("roomId");
