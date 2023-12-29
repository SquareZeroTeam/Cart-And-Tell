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
exports.LivestreamController = void 0;
const common_1 = require("@nestjs/common");
const livestream_service_1 = require("./livestream.service");
const create_livestream_dto_1 = require("./dto/create-livestream.dto");
const update_livestream_dto_1 = require("./dto/update-livestream.dto");
const is_merchant_self_or_admin_products_guard_1 = require("../../guards/is-merchant-self-or-admin-products.guard");
let LivestreamController = class LivestreamController {
    constructor(livestreamService) {
        this.livestreamService = livestreamService;
    }
    create(createLivestreamDto, merchantId) {
        return this.livestreamService.create(+merchantId, createLivestreamDto);
    }
    findAll(merchantId) {
        return this.livestreamService.findAll(+merchantId);
    }
    findOne(merchantId, id) {
        return this.livestreamService.findOne(+merchantId, id);
    }
    update(merchantId, id, updateLivestreamDto) {
        return this.livestreamService.update(+merchantId, id, updateLivestreamDto);
    }
    remove(merchantId, id) {
        return this.livestreamService.remove(+merchantId, id);
    }
};
exports.LivestreamController = LivestreamController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(is_merchant_self_or_admin_products_guard_1.IsMerchantSelfOrAdminProductsGuard),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Param)('merchantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_livestream_dto_1.CreateLivestreamDto, String]),
    __metadata("design:returntype", void 0)
], LivestreamController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('merchantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LivestreamController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('merchantId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LivestreamController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(is_merchant_self_or_admin_products_guard_1.IsMerchantSelfOrAdminProductsGuard),
    __param(0, (0, common_1.Param)('merchantId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_livestream_dto_1.UpdateLivestreamDto]),
    __metadata("design:returntype", void 0)
], LivestreamController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(is_merchant_self_or_admin_products_guard_1.IsMerchantSelfOrAdminProductsGuard),
    __param(0, (0, common_1.Param)('merchantId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LivestreamController.prototype, "remove", null);
exports.LivestreamController = LivestreamController = __decorate([
    (0, common_1.Controller)('merchant/:merchantId/livestream'),
    __metadata("design:paramtypes", [livestream_service_1.LivestreamService])
], LivestreamController);
//# sourceMappingURL=livestream.controller.js.map