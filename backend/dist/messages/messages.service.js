"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../db/prisma/prisma.service");
let MessagesService = class MessagesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createMessageDto) {
        console.log(createMessageDto);
        const liveStream = await this.prisma.liveStream.findUnique({ where: { roomId: createMessageDto.liveStreamRoomId } });
        if (!liveStream) {
            throw new common_1.NotFoundException('Live stream not found');
        }
        return await this.prisma.message.create({
            data: createMessageDto,
            include: { user: { select: { email: true, id: true } } }
        });
    }
    async findAll(roomId) {
        return await this.prisma.message.findMany({ where: { liveStreamRoomId: (roomId) ? roomId : "" }, include: { user: { select: { id: true, email: true } } } });
    }
    async joinRoom(roomId, userId) {
        const liveStream = await this.prisma.liveStream.findUnique({ where: { roomId: (roomId) ? roomId : "" } });
        const user = await this.prisma.user.findUnique({ where: { id: (userId) ? userId : 0 } });
        if (!liveStream) {
            throw new common_1.NotFoundException('Live stream not found');
        }
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessagesService);
//# sourceMappingURL=messages.service.js.map