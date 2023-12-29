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
exports.IsAccountStatusActiveGuard = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../db/prisma/prisma.service");
let IsAccountStatusActiveGuard = class IsAccountStatusActiveGuard {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (user.status != 'Active') {
            throw new common_1.ForbiddenException(`This account is ${user.status}`);
        }
        return true;
    }
};
exports.IsAccountStatusActiveGuard = IsAccountStatusActiveGuard;
exports.IsAccountStatusActiveGuard = IsAccountStatusActiveGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IsAccountStatusActiveGuard);
//# sourceMappingURL=is-account-status-active.guard.js.map