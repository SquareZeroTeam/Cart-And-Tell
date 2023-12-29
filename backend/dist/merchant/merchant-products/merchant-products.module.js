"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantProductsModule = void 0;
const common_1 = require("@nestjs/common");
const merchant_products_service_1 = require("./merchant-products.service");
const merchant_products_controller_1 = require("./merchant-products.controller");
const supabase_module_1 = require("../../microservices/supabase/supabase.module");
const prisma_module_1 = require("../../db/prisma/prisma.module");
const jwt_service_1 = require("../../authentication/jwt/jwt.service");
let MerchantProductsModule = class MerchantProductsModule {
};
exports.MerchantProductsModule = MerchantProductsModule;
exports.MerchantProductsModule = MerchantProductsModule = __decorate([
    (0, common_1.Module)({
        controllers: [merchant_products_controller_1.MerchantProductsController],
        providers: [merchant_products_service_1.MerchantProductsService, jwt_service_1.JwtService],
        imports: [supabase_module_1.SupabaseModule, prisma_module_1.PrismaModule]
    })
], MerchantProductsModule);
//# sourceMappingURL=merchant-products.module.js.map