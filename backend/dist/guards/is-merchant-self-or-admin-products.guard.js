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
exports.IsMerchantSelfOrAdminProductsGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("../authentication/jwt/jwt.service");
let IsMerchantSelfOrAdminProductsGuard = class IsMerchantSelfOrAdminProductsGuard {
    constructor(jwt) {
        this.jwt = jwt;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const userObj = request.user;
        if (userObj.isMerchant && (userObj.merchant.id == request.params.merchantId)) {
            return true;
        }
        else if (userObj.email == process.env.ADMIN_EMAIL) {
            return true;
        }
        return false;
    }
};
exports.IsMerchantSelfOrAdminProductsGuard = IsMerchantSelfOrAdminProductsGuard;
exports.IsMerchantSelfOrAdminProductsGuard = IsMerchantSelfOrAdminProductsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtService])
], IsMerchantSelfOrAdminProductsGuard);
//# sourceMappingURL=is-merchant-self-or-admin-products.guard.js.map