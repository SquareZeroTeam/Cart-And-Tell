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
exports.MerchantService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../db/prisma/prisma.service");
const supabase_service_1 = require("../microservices/supabase/supabase.service");
const nest_mailer_service_1 = require("../nest-mailer/nest-mailer.service");
const client_1 = require("@prisma/client");
let MerchantService = class MerchantService {
    constructor(prisma, supabase, nestMailer) {
        this.prisma = prisma;
        this.supabase = supabase;
        this.nestMailer = nestMailer;
    }
    async create(createMerchantDto, image, proofOfAuthenticity) {
        const user = await this.prisma.user.findUnique({ where: { id: +createMerchantDto.userId }, include: { merchant: true } });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        if (!user.isMerchant) {
            throw new common_1.BadRequestException("This User is not registered as Merchant");
        }
        if (user.merchant) {
            throw new common_1.BadRequestException("This Merchant is already registered");
        }
        const merchantExist = await this.prisma.merchant.findFirst({
            where: { name: createMerchantDto.name }
        });
        if (merchantExist) {
            throw new common_1.BadRequestException("Merchant already exists");
        }
        const imageLink = await this.supabase.uploadImage(image);
        const pdfLink = await this.supabase.uploadPDF(proofOfAuthenticity);
        createMerchantDto.categoryId = +createMerchantDto.categoryId;
        createMerchantDto.userId = +createMerchantDto.userId;
        createMerchantDto.merchantStartValidity = new Date(createMerchantDto.merchantStartValidity);
        createMerchantDto.merchantEndValidity = new Date(createMerchantDto.merchantEndValidity);
        const newMerchant = await this.prisma.merchant.create({ data: { ...createMerchantDto, image: imageLink, proofOfAuthenticity: pdfLink } });
        return newMerchant;
    }
    async findAll(status) {
        const query = {};
        console.log(status);
        if (status) {
            if (status !== client_1.merchantStatus.Approved && status !== client_1.merchantStatus.Pending && status !== client_1.merchantStatus.Rejected && status !== client_1.merchantStatus.Removed) {
                throw new common_1.BadRequestException('Invalid status');
            }
            query.status = status;
            console.log(query);
        }
        return await this.prisma.merchant.findMany({ where: { status: query.status }, include: { products: true, user: true, category: true } });
    }
    async findAllVerified(category) {
        console.log(category);
        if (category) {
            return await this.prisma.merchant.findMany({ where: { isVerified: true, category: { name: category } }, include: { products: true, user: true, category: true } });
        }
        return await this.prisma.merchant.findMany({ where: { isVerified: true }, include: { products: true, user: true, category: true } });
    }
    async findAllUnVerified(category) {
        if (category) {
            return await this.prisma.merchant.findMany({ where: { isVerified: false, category: { name: category } }, include: { products: true, user: true, category: true } });
        }
        return await this.prisma.merchant.findMany({ where: { isVerified: false }, include: { products: true, user: true, category: true } });
    }
    async findCartAndTell() {
        const cartandtellUser = await this.prisma.user.findUnique({ where: { email: process.env.ADMIN_EMAIL } });
        if (!cartandtellUser) {
            throw new common_1.NotFoundException("Cart and Tell User not found, Please Set Up");
        }
        const cartandtellMerchant = await this.prisma.merchant.findUnique({ where: { userId: cartandtellUser.id }, include: { products: true } });
        if (!cartandtellMerchant) {
            throw new common_1.NotFoundException("Cart and Tell Merchant not found, Please Set Up");
        }
        return cartandtellMerchant;
    }
    async findOne(id) {
        const merchant = await this.prisma.merchant.findUnique({ where: { id }, include: { products: true } });
        if (!merchant) {
            throw new common_1.NotFoundException("Merchant not found");
        }
        return merchant;
    }
    async update(id, updateMerchantDto, image, proofOfAuthenticity) {
        const merchant = await this.prisma.merchant.findUnique({ where: { id } });
        if (!merchant) {
            throw new common_1.NotFoundException("Merchant not found");
        }
        const merchantExit = await this.prisma.merchant.findFirst({
            where: {
                OR: [
                    { name: updateMerchantDto.name },
                    { website: updateMerchantDto.website }
                ]
            }
        });
        if (merchantExit) {
            throw new common_1.BadRequestException("Merchant Name or Merchant Website already exists");
        }
        if (updateMerchantDto.categoryId) {
            updateMerchantDto.categoryId = +updateMerchantDto.categoryId;
        }
        if (!image && proofOfAuthenticity) {
            const pdfLink = await this.supabase.uploadPDF(proofOfAuthenticity);
            const updatedMerchant = await this.prisma.merchant.update({
                where: { id },
                data: { ...updateMerchantDto, proofOfAuthenticity: pdfLink }
            });
            return updatedMerchant;
        }
        if (image && !proofOfAuthenticity) {
            const imageLink = await this.supabase.uploadImage(image);
            const updatedMerchant = await this.prisma.merchant.update({
                where: { id },
                data: { ...updateMerchantDto, image: imageLink }
            });
            return updatedMerchant;
        }
        if (image && proofOfAuthenticity) {
            const imageLink = await this.supabase.uploadImage(image);
            const pdfLink = await this.supabase.uploadPDF(proofOfAuthenticity);
            const updatedMerchant = await this.prisma.merchant.update({
                where: { id },
                data: {
                    ...updateMerchantDto,
                    proofOfAuthenticity: pdfLink,
                    image: imageLink
                }
            });
            return updatedMerchant;
        }
        if (updateMerchantDto.isVerified) {
            updateMerchantDto.isVerified = new RegExp("true").test(updateMerchantDto.isVerified.toString());
        }
        const updatedMerchant = await this.prisma.merchant.update({
            where: { id },
            data: { ...updateMerchantDto }
        });
        return updatedMerchant;
    }
    async approve(id) {
        const merchant = await this.prisma.merchant.findUnique({ where: { id }, include: { user: true } });
        if (!merchant) {
            throw new common_1.NotFoundException("Merchant not found");
        }
        if (merchant.isVerified) {
            throw new common_1.BadRequestException("Merchant is already verified");
        }
        const updatedMerchant = await this.prisma.merchant.update({
            where: { id },
            data: { isVerified: true, status: 'Approved' }
        });
        this.nestMailer.sendMerchantApproved(merchant.id);
        return updatedMerchant;
    }
    async reject(id) {
        const merchant = await this.prisma.merchant.findUnique({ where: { id }, include: { user: true } });
        const user = await this.prisma.user.findUnique({ where: { id: merchant.user.id } });
        if (!merchant) {
            throw new common_1.NotFoundException("Merchant not found");
        }
        if (merchant.isVerified) {
            throw new common_1.BadRequestException("Merchant is already verified");
        }
        await this.nestMailer.sendMerchantRejected(merchant.id);
        const rejectedMerchant = await this.prisma.merchant.delete({
            where: { id },
        });
        return rejectedMerchant;
    }
    async remove(id) {
        const merchant = await this.prisma.merchant.findUnique({ where: { id }, include: { products: true, user: true } });
        if (!merchant) {
            throw new common_1.NotFoundException("Merchant not found");
        }
        if (merchant.products.length > 0) {
            throw new common_1.BadRequestException("Merchant has products, please delete the products first");
        }
        if (merchant.user.email === process.env.ADMIN_EMAIL) {
            throw new common_1.BadRequestException("Merchant is ADMIN, cannot be removed");
        }
        return await this.prisma.merchant.delete({ where: { id } });
    }
};
exports.MerchantService = MerchantService;
exports.MerchantService = MerchantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        supabase_service_1.SupabaseService,
        nest_mailer_service_1.NestMailerService])
], MerchantService);
//# sourceMappingURL=merchant.service.js.map