"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivestreamModule = void 0;
const common_1 = require("@nestjs/common");
const livestream_service_1 = require("./livestream.service");
const livestream_controller_1 = require("./livestream.controller");
const prisma_module_1 = require("../../db/prisma/prisma.module");
const jwt_service_1 = require("../../authentication/jwt/jwt.service");
let LivestreamModule = class LivestreamModule {
};
exports.LivestreamModule = LivestreamModule;
exports.LivestreamModule = LivestreamModule = __decorate([
    (0, common_1.Module)({
        controllers: [livestream_controller_1.LivestreamController],
        providers: [livestream_service_1.LivestreamService, jwt_service_1.JwtService],
        imports: [prisma_module_1.PrismaModule]
    })
], LivestreamModule);
//# sourceMappingURL=livestream.module.js.map