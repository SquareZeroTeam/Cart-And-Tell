import { OnGatewayConnection } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { JwtService } from 'src/authentication/jwt/jwt.service';
import { PrismaService } from 'src/db/prisma/prisma.service';
export declare class MessagesGateway implements OnGatewayConnection {
    private readonly messagesService;
    private readonly jwt;
    private readonly prisma;
    server: Server;
    constructor(messagesService: MessagesService, jwt: JwtService, prisma: PrismaService);
    handleConnection(client: Socket, ...args: any[]): Promise<void>;
    create(createMessageDto: CreateMessageDto, client: Socket): Promise<{
        user: {
            id: number;
            email: string;
        };
    } & {
        id: number;
        text: string;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        liveStreamRoomId: string;
    }>;
    findAll(roomId: string): Promise<({
        user: {
            id: number;
            email: string;
        };
    } & {
        id: number;
        text: string;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        liveStreamRoomId: string;
    })[]>;
    joinRoom(data: {
        userId: number;
        roomId: string;
    }, client: Socket): Promise<void>;
    userConnected(data: {
        clientId: any;
        roomId: string;
    }, client: Socket): Promise<void>;
    liveStreamViewers(data: {
        roomId: string;
    }, client: Socket): Promise<{
        id: number;
        socketId: string;
        peerId: string;
        liveStreamId: string;
    }[]>;
    endLivestream(roomId: string, client: Socket): Promise<void>;
}
