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
exports.NestMailerService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const prisma_service_1 = require("../db/prisma/prisma.service");
let NestMailerService = class NestMailerService {
    constructor(mailerService, prisma) {
        this.mailerService = mailerService;
        this.prisma = prisma;
    }
    async sendEmailVerification(userId) {
        const emailVerification = await this.prisma.emailVerification.findFirst({ where: { userId } });
        if (!emailVerification) {
            throw new common_1.NotFoundException("Email verification not found");
        }
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const url = `${process.env.FRONTEND_URL}/verify-email/${emailVerification.id}`;
        this.mailerService.sendMail({
            to: user.email,
            from: `${process.env.SMTP_EMAIL}`,
            subject: "Cart & Tell User Email Verification",
            template: 'emailVerification',
            context: {
                username: user.email.split('@')[0],
                link: url,
            }
        });
    }
    async sendMerchantApproved(merchantId) {
        const merchant = await this.prisma.merchant.findUnique({ where: { id: merchantId }, include: { user: true } });
        if (!merchant) {
            throw new common_1.NotFoundException("Merchant not found");
        }
        this.mailerService.sendMail({
            to: merchant.user.email,
            from: `${process.env.SMTP_EMAIL}`,
            subject: "Cart & Tell Merchant Profile Request",
            template: 'merchantApproved',
            context: {
                name: merchant.name,
                link: `${process.env.FRONTEND_URL}/merchant/${merchant.id}`
            }
        });
    }
    async sendMerchantRejected(merchantId) {
        const merchant = await this.prisma.merchant.findUnique({ where: { id: merchantId }, include: { user: true } });
        if (!merchant) {
            throw new common_1.NotFoundException("Merchant not found");
        }
        this.mailerService.sendMail({
            to: merchant.user.email,
            from: `${process.env.SMTP_EMAIL}`,
            subject: "Cart & Tell Merchant Profile Request",
            template: 'merchantRejected',
            context: {
                name: merchant.name,
            }
        });
    }
};
exports.NestMailerService = NestMailerService;
exports.NestMailerService = NestMailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService, prisma_service_1.PrismaService])
], NestMailerService);
//# sourceMappingURL=nest-mailer.service.js.map