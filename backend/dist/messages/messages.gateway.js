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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const messages_service_1 = require("./messages.service");
const create_message_dto_1 = require("./dto/create-message.dto");
const socket_io_1 = require("socket.io");
const jwt_service_1 = require("../authentication/jwt/jwt.service");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../db/prisma/prisma.service");
let MessagesGateway = class MessagesGateway {
    constructor(messagesService, jwt, prisma) {
        this.messagesService = messagesService;
        this.jwt = jwt;
        this.prisma = prisma;
    }
    async handleConnection(client, ...args) {
        client.on('disconnecting', async () => {
            console.log(`${client.id} disconnected from room ${Array.from(client.rooms.values())}`);
            await this.prisma.clientConnected.deleteMany({ where: { socketId: client.id } });
        });
        console.log('User is connected');
    }
    async create(createMessageDto, client) {
        let userObj = null;
        try {
            userObj = this.jwt.decode(client.request.headers.authorization.split(' ')[1]);
        }
        catch (error) {
            throw new common_1.ForbiddenException('You are not authorized to access this resource');
        }
        if (userObj.id !== createMessageDto.userId) {
            throw new common_1.ForbiddenException('You are not authorized to access this resource');
        }
        const message = await this.messagesService.create(createMessageDto);
        this.server.to(createMessageDto.liveStreamRoomId).emit('message', message);
        return message;
    }
    async findAll(roomId) {
        return await this.messagesService.findAll(roomId);
    }
    async joinRoom(data, client) {
        client.join(data.roomId);
        return await this.messagesService.joinRoom(data.roomId, data.userId);
    }
    async userConnected(data, client) {
        console.log('user connected to livestream');
        client.broadcast.to(data.roomId).emit('connectlivestream', data);
        const liveStream = await this.prisma.liveStream.findUnique({ where: { roomId: data.roomId } });
        await this.prisma.clientConnected.create({ data: { liveStreamId: liveStream.roomId, socketId: client.id, peerId: data.clientId } });
    }
    async liveStreamViewers(data, client) {
        const liveStream = await this.prisma.liveStream.findUnique({ where: { roomId: data.roomId } });
        const viewers = await this.prisma.clientConnected.findMany({ where: { liveStreamId: liveStream.roomId } });
        console.log(viewers);
        return viewers;
    }
    async endLivestream(roomId, client) {
        let userObj = null;
        const livestream = await this.prisma.liveStream.findUnique({ where: { roomId } });
        console.log(livestream);
        try {
            userObj = this.jwt.decode(client.request.headers.authorization.split(' ')[1]);
            console.log(userObj);
        }
        catch (error) {
            throw new common_1.ForbiddenException('You are not authorized to access this resource');
        }
        if (userObj.merchant.id != livestream.merchantId) {
            throw new common_1.ForbiddenException('You are not authorized to access this resource');
        }
        this.server.to(roomId).emit('endLivestreamDisconnect');
        await this.prisma.message.deleteMany({ where: { liveStreamRoomId: roomId } });
        await this.prisma.liveStream.delete({ where: { roomId } });
    }
};
exports.MessagesGateway = MessagesGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessagesGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findAllMessages'),
    __param(0, (0, websockets_1.MessageBody)("roomId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "findAll", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "joinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinLivestream'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "userConnected", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('liveStreamViewers'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "liveStreamViewers", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('endLivestream'),
    __param(0, (0, websockets_1.MessageBody)('roomId')),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "endLivestream", null);
exports.MessagesGateway = MessagesGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*'
        },
        namespace: 'messages'
    }),
    __metadata("design:paramtypes", [messages_service_1.MessagesService, jwt_service_1.JwtService, prisma_service_1.PrismaService])
], MessagesGateway);
//# sourceMappingURL=messages.gateway.js.map