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
exports.MerchantProductsController = void 0;
const common_1 = require("@nestjs/common");
const merchant_products_service_1 = require("./merchant-products.service");
const create_merchant_product_dto_1 = require("./dto/create-merchant-product.dto");
const update_merchant_product_dto_1 = require("./dto/update-merchant-product.dto");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../../authentication/auth/jwt.auth.guard");
const is_merchant_self_or_admin_products_guard_1 = require("../../guards/is-merchant-self-or-admin-products.guard");
const is_merchant_verified_or_admin_guards_1 = require("../../guards/is-merchant-verified-or-admin.guards");
let MerchantProductsController = class MerchantProductsController {
    constructor(merchantProductsService) {
        this.merchantProductsService = merchantProductsService;
    }
    create(id, image, createMerchantProductDto) {
        return this.merchantProductsService.create(+id, image, createMerchantProductDto);
    }
    findAll(merchantId) {
        return this.merchantProductsService.findAll(+merchantId);
    }
    findOne(merchantId, id) {
        return this.merchantProductsService.findOne(+merchantId, +id);
    }
    update(merchantId, id, image, updateMerchantProductDto) {
        return this.merchantProductsService.update(+merchantId, +id, image, updateMerchantProductDto);
    }
    remove(merchantId, id) {
        return this.merchantProductsService.remove(+merchantId, +id);
    }
};
exports.MerchantProductsController = MerchantProductsController;
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, is_merchant_self_or_admin_products_guard_1.IsMerchantSelfOrAdminProductsGuard, is_merchant_verified_or_admin_guards_1.IsMerchantVerifiedOrAdmin),
    __param(0, (0, common_1.Param)('merchantId')),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5, message(maxSize) {
                    return `Maximum file size is ${maxSize / 1024 / 1024}MB`;
                }, }),
            new common_1.FileTypeValidator({ fileType: 'image/*' }),
        ],
    }))),
    __param(2, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, create_merchant_product_dto_1.CreateMerchantProductDto]),
    __metadata("design:returntype", void 0)
], MerchantProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('merchantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MerchantProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('merchantId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MerchantProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, is_merchant_self_or_admin_products_guard_1.IsMerchantSelfOrAdminProductsGuard, is_merchant_verified_or_admin_guards_1.IsMerchantVerifiedOrAdmin),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)('merchantId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        fileIsRequired: false,
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5, message(maxSize) {
                    return `Maximum file size is ${maxSize / 1024 / 1024}MB`;
                }, }),
            new common_1.FileTypeValidator({ fileType: 'image/*' }),
        ],
    }))),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, update_merchant_product_dto_1.UpdateMerchantProductDto]),
    __metadata("design:returntype", void 0)
], MerchantProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, is_merchant_self_or_admin_products_guard_1.IsMerchantSelfOrAdminProductsGuard, is_merchant_verified_or_admin_guards_1.IsMerchantVerifiedOrAdmin),
    __param(0, (0, common_1.Param)('merchantId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MerchantProductsController.prototype, "remove", null);
exports.MerchantProductsController = MerchantProductsController = __decorate([
    (0, common_1.Controller)('merchant/:merchantId/products'),
    __metadata("design:paramtypes", [merchant_products_service_1.MerchantProductsService])
], MerchantProductsController);
//# sourceMappingURL=merchant-products.controller.js.map