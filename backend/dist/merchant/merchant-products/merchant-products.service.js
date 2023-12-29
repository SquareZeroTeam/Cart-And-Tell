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
exports.MerchantProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../db/prisma/prisma.service");
const supabase_service_1 = require("../../microservices/supabase/supabase.service");
let MerchantProductsService = class MerchantProductsService {
    constructor(prisma, supabase) {
        this.prisma = prisma;
        this.supabase = supabase;
    }
    async create(id, image, createMerchantProductDto) {
        const merchant = await this.prisma.merchant.findUnique({ where: { id } });
        if (!merchant) {
            throw new common_1.NotFoundException("Merchant not found");
        }
        if (!image) {
            throw new common_1.BadRequestException("Please upload a image");
        }
        const imageLink = await this.supabase.uploadImage(image);
        createMerchantProductDto.amount = parseFloat(createMerchantProductDto.amount.toString());
        const newProduct = await this.prisma.product.create({ data: { ...createMerchantProductDto, merchantId: id, image: imageLink } });
        return newProduct;
    }
    async findAll(merchantId) {
        const merchant = await this.prisma.merchant.findUnique({ where: { id: merchantId } });
        if (!merchant) {
            throw new common_1.NotFoundException("Merchant not found");
        }
        return await this.prisma.product.findMany({ where: { merchantId } });
    }
    async findOne(merchantId, id) {
        const merchant = await this.prisma.merchant.findUnique({ where: { id: merchantId } });
        if (!merchant) {
            throw new common_1.NotFoundException("Merchant not found");
        }
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException("Product not found");
        }
        return product;
    }
    async update(merchantId, id, image, updateMerchantProductDto) {
        const merchant = await this.prisma.merchant.findUnique({ where: { id: merchantId } });
        const updateForm = { ...updateMerchantProductDto };
        if (!merchant) {
            throw new common_1.NotFoundException("Merchant not found");
        }
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException("Product not found");
        }
        if (image) {
            const imageLink = await this.supabase.uploadImage(image);
            updateForm['image'] = imageLink;
        }
        if (updateMerchantProductDto.amount) {
            updateForm['amount'] = parseFloat(updateMerchantProductDto.amount.toString());
        }
        if (updateMerchantProductDto.description) {
            updateForm['description'] = updateMerchantProductDto.description;
        }
        if (updateMerchantProductDto.name) {
            updateForm['name'] = updateMerchantProductDto.name;
        }
        const updatedProduct = this.prisma.product.update({ where: { id: id }, data: updateForm });
        return updatedProduct;
    }
    async remove(merchantId, id) {
        const merchant = await this.prisma.merchant.findUnique({ where: { id: merchantId } });
        if (!merchant) {
            throw new common_1.NotFoundException("Merchant not found");
        }
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException("Product not found");
        }
        return await this.prisma.product.delete({ where: { id } });
    }
};
exports.MerchantProductsService = MerchantProductsService;
exports.MerchantProductsService = MerchantProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        supabase_service_1.SupabaseService])
], MerchantProductsService);
//# sourceMappingURL=merchant-products.service.js.map