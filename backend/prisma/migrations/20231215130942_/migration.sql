-- CreateTable
CREATE TABLE "ClientConnected" (
    "int" SERIAL NOT NULL,
    "socketId" TEXT NOT NULL,
    "peerId" TEXT NOT NULL,
    "liveStreamId" TEXT NOT NULL,

    CONSTRAINT "ClientConnected_pkey" PRIMARY KEY ("int")
);

-- AddForeignKey
ALTER TABLE "ClientConnected" ADD CONSTRAINT "ClientConnected_liveStreamId_fkey" FOREIGN KEY ("liveStreamId") REFERENCES "LiveStream"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;
