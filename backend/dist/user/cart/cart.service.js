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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../db/prisma/prisma.service");
let CartService = class CartService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCartDto, userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        const product = await this.prisma.product.findUnique({ where: { id: +createCartDto.products[0] } });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        if (!product) {
            throw new common_1.NotFoundException("Product not found");
        }
        const productItem = await this.prisma.productItem.findFirst({ where: { productId: +createCartDto.products[0], userId } });
        let productCart;
        if (!productItem) {
            productCart = await this.prisma.productItem.create({
                data: {
                    quantity: createCartDto.quantity,
                    productId: +createCartDto.products[0],
                    userId: userId
                }
            });
        }
        else {
            productCart = await this.prisma.productItem.update({
                where: { id: productItem.id },
                data: {
                    quantity: { increment: createCartDto.quantity }
                }
            });
        }
        return productCart;
    }
    async findAll(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const cart = await this.prisma.productItem.findMany({ where: { userId }, include: { product: true } });
        return cart;
    }
    async increment(id, userId) {
        const product = await this.prisma.productItem.findUnique({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException("Product not found");
        }
        return await this.prisma.productItem.update({
            where: { id },
            data: {
                quantity: { increment: 1 }
            }
        });
    }
    async decrement(id, userId) {
        const product = await this.prisma.productItem.findUnique({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException("Product not found");
        }
        if (product.quantity == 1) {
            return await this.prisma.productItem.findUnique({ where: { id } });
        }
        return await this.prisma.productItem.update({
            where: { id },
            data: {
                quantity: { decrement: 1 }
            }
        });
    }
    async remove(deleteCarDto, userId) {
        deleteCarDto.products = deleteCarDto.products.map(id => +id);
        const deletedProducts = await this.prisma.productItem.deleteMany({ where: { id: { in: deleteCarDto.products } } });
        return deletedProducts;
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map