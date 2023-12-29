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
exports.MerchantController = void 0;
const common_1 = require("@nestjs/common");
const merchant_service_1 = require("./merchant.service");
const create_merchant_dto_1 = require("./dto/create-merchant.dto");
const update_merchant_dto_1 = require("./dto/update-merchant.dto");
const platform_express_1 = require("@nestjs/platform-express");
const files_validator_1 = require("./files.validator");
const jwt_auth_guard_1 = require("../authentication/auth/jwt.auth.guard");
const is_merchant_self_or_admin_guard_1 = require("../guards/is-merchant-self-or-admin.guard");
const jwt_service_1 = require("../authentication/jwt/jwt.service");
const is_admin_guard_1 = require("../guards/is-admin.guard");
const client_1 = require("@prisma/client");
let MerchantController = class MerchantController {
    constructor(merchantService, jwt) {
        this.merchantService = merchantService;
        this.jwt = jwt;
    }
    create(createMerchantDto, files, token) {
        return this.merchantService.create(createMerchantDto, files.image[0], files.proofOfAuthenticity[0]);
    }
    findAll(status) {
        return this.merchantService.findAll(status);
    }
    findAllVerfied(category) {
        return this.merchantService.findAllVerified(category);
    }
    findAllUnVerfied(category) {
        return this.merchantService.findAllUnVerified(category);
    }
    findCartAndTell() {
        return this.merchantService.findCartAndTell();
    }
    findOne(id) {
        return this.merchantService.findOne(+id);
    }
    approve(id) {
        return this.merchantService.approve(+id);
    }
    reject(id) {
        return this.merchantService.reject(+id);
    }
    update(id, updateMerchantDto, files) {
        const maxFileSize = 1024 * 1024 * 5;
        if (!files.image) {
            files.image = null;
        }
        else {
            const pattern = new RegExp("image/*");
            if (!pattern.test(files.image[0].mimetype)) {
                throw new common_1.BadRequestException("image is not a type of image/*");
            }
            if (files.image[0].size > maxFileSize) {
                throw new common_1.BadRequestException("image must be less than " + maxFileSize + " bytes");
            }
            files.image = files.image[0];
        }
        if (!files.proofOfAuthenticity) {
            files.proofOfAuthenticity = null;
        }
        else {
            const pattern = new RegExp("application/pdf");
            if (!pattern.test(files.proofOfAuthenticity[0].mimetype)) {
                throw new common_1.BadRequestException("proofOfAuthenticity is not a type of application/pdf");
            }
            if (files.proofOfAuthenticity[0].size > maxFileSize) {
                throw new common_1.BadRequestException("proofOfAuthenticity must be less than " + maxFileSize + " bytes");
            }
            files.proofOfAuthenticity = files.proofOfAuthenticity[0];
        }
        return this.merchantService.update(+id, updateMerchantDto, files.image, files.proofOfAuthenticity);
    }
    remove(id) {
        return this.merchantService.remove(+id);
    }
};
exports.MerchantController = MerchantController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'image', maxCount: 1 },
        { name: 'proofOfAuthenticity', maxCount: 1 }
    ])),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        validators: [new files_validator_1.FilesValidator({ filesSchema: [
                    { fieldName: 'image', fileType: 'image/*', maxSize: 1024 * 1024 * 5 },
                    { fieldName: 'proofOfAuthenticity', fileType: 'application/pdf', maxSize: 1024 * 1024 * 5 }
                ] })]
    }))),
    __param(2, (0, common_1.Headers)("Authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_merchant_dto_1.CreateMerchantDto, Object, String]),
    __metadata("design:returntype", void 0)
], MerchantController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, is_admin_guard_1.IsAdminGuard),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MerchantController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("/verified"),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MerchantController.prototype, "findAllVerfied", null);
__decorate([
    (0, common_1.Get)("/unVerified"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, is_admin_guard_1.IsAdminGuard),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MerchantController.prototype, "findAllUnVerfied", null);
__decorate([
    (0, common_1.Get)("/cartandtell"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MerchantController.prototype, "findCartAndTell", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MerchantController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/approve'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, is_admin_guard_1.IsAdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MerchantController.prototype, "approve", null);
__decorate([
    (0, common_1.Patch)(':id/reject'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, is_admin_guard_1.IsAdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MerchantController.prototype, "reject", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, is_merchant_self_or_admin_guard_1.IsMerchantSelfOrAdminGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'image', maxCount: 1 },
        { name: 'proofOfAuthenticity', maxCount: 1 }
    ])),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_merchant_dto_1.UpdateMerchantDto, Object]),
    __metadata("design:returntype", void 0)
], MerchantController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, is_admin_guard_1.IsAdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MerchantController.prototype, "remove", null);
exports.MerchantController = MerchantController = __decorate([
    (0, common_1.Controller)('merchant'),
    __metadata("design:paramtypes", [merchant_service_1.MerchantService, jwt_service_1.JwtService])
], MerchantController);
//# sourceMappingURL=merchant.controller.js.map