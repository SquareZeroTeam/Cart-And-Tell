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
exports.VerifyEmailService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../db/prisma/prisma.service");
let VerifyEmailService = class VerifyEmailService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOne(id) {
        const verification = await this.prisma.emailVerification.findUnique({ where: { id } });
        if (!verification) {
            throw new common_1.NotFoundException('Invalid Verification Link Token');
        }
        await this.prisma.user.update({ where: { id: verification.userId }, data: { isEmailVerified: true } });
        await this.prisma.emailVerification.delete({ where: { id } });
        return { message: "Email Verified" };
    }
};
exports.VerifyEmailService = VerifyEmailService;
exports.VerifyEmailService = VerifyEmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VerifyEmailService);
//# sourceMappingURL=verify-email.service.js.map