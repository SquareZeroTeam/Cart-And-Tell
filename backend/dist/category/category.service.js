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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../db/prisma/prisma.service");
const supabase_service_1 = require("../microservices/supabase/supabase.service");
let CategoryService = class CategoryService {
    constructor(prisma, supabase) {
        this.prisma = prisma;
        this.supabase = supabase;
    }
    async create(createCategoryDto, image) {
        if (!image) {
            return await this.prisma.category.create({ data: createCategoryDto });
        }
        const imageLink = await this.supabase.uploadImage(image);
        return await this.prisma.category.create({ data: { ...createCategoryDto, icon: imageLink } });
    }
    async findAll() {
        return await this.prisma.category.findMany();
    }
    async findOne(id) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException(`Category #${id} not found`);
        }
        return category;
    }
    async update(id, updateCategoryDto, image) {
        if (!image) {
            return await this.prisma.category.update({ where: { id }, data: updateCategoryDto });
        }
        const imageLink = await this.supabase.uploadImage(image);
        return await this.prisma.category.update({ where: { id: id }, data: { ...updateCategoryDto, icon: imageLink } });
    }
    async remove(id) {
        const category = await this.prisma.category.findUnique({ where: { id }, include: { merchant: true } });
        if (!category) {
            throw new common_1.NotFoundException(`Category #${id} not found`);
        }
        if (category.merchant.length > 0) {
            throw new common_1.BadRequestException(`Category #${id} is used by merchant(s)`);
        }
        return await this.prisma.category.delete({ where: { id } });
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, supabase_service_1.SupabaseService])
], CategoryService);
//# sourceMappingURL=category.service.js.map