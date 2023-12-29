import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
export declare class MessagesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createMessageDto: CreateMessageDto): Promise<{
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
    joinRoom(roomId: string, userId: number): Promise<void>;
}
