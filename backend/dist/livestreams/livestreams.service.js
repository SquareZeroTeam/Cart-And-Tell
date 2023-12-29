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
exports.LivestreamsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../db/prisma/prisma.service");
let LivestreamsService = class LivestreamsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createLivestreamDto) {
        return 'This action adds a new livestream';
    }
    async findAll() {
        return await this.prisma.liveStream.findMany({ include: { merchant: { select: { name: true, image: true, category: true } } } });
    }
    async findOne(roomId) {
        const liveStream = await this.prisma.liveStream.findUnique({ where: { roomId }, include: { merchant: { select: { id: true, name: true, image: true, category: true } } } });
        if (!liveStream) {
            throw new common_1.NotFoundException('Live stream not found');
        }
        return liveStream;
    }
};
exports.LivestreamsService = LivestreamsService;
exports.LivestreamsService = LivestreamsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LivestreamsService);
//# sourceMappingURL=livestreams.service.js.map