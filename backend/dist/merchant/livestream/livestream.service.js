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
exports.LivestreamService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../db/prisma/prisma.service");
let LivestreamService = class LivestreamService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(merchantId, createLivestreamDto) {
        return this.prisma.liveStream.create({ data: { ...createLivestreamDto, merchantId } });
    }
    async findAll(merchantId) {
        return await this.prisma.liveStream.findMany({ where: { merchantId } });
    }
    async findOne(merchantId, id) {
        const liveStream = await this.prisma.liveStream.findUnique({ where: { merchantId, roomId: id } });
        if (!liveStream) {
            throw new common_1.HttpException('Live stream not found', 404);
        }
        ;
        return liveStream;
    }
    async update(merchantId, id, updateLivestreamDto) {
        const liveStream = await this.prisma.liveStream.findUnique({ where: { merchantId, roomId: id } });
        if (!liveStream) {
            throw new common_1.HttpException('Live stream not found', 404);
        }
        ;
        return this.prisma.liveStream.update({ where: { merchantId, roomId: id }, data: updateLivestreamDto });
    }
    async remove(merchantId, id) {
        return this.prisma.liveStream.delete({ where: { merchantId, roomId: id } });
    }
};
exports.LivestreamService = LivestreamService;
exports.LivestreamService = LivestreamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LivestreamService);
//# sourceMappingURL=livestream.service.js.map