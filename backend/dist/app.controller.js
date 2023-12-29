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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const util_1 = require("util");
const prisma_service_1 = require("./db/prisma/prisma.service");
const nest_mailer_service_1 = require("./nest-mailer/nest-mailer.service");
let AppController = class AppController {
    constructor(appService, prisma, nestMailer) {
        this.appService = appService;
        this.prisma = prisma;
        this.nestMailer = nestMailer;
    }
    hello() {
        return { message: 'Cart-And-Tell API v1.0.0' };
    }
    async throttle() {
        const delay = (0, util_1.promisify)(setTimeout);
        await delay(5000);
        return { message: 'ok' };
    }
    async testEmail() {
        await this.nestMailer.sendEmailVerification(18);
        return { message: "Sending Email" };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "hello", null);
__decorate([
    (0, common_1.Get)('throttle'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "throttle", null);
__decorate([
    (0, common_1.Get)('testMail'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "testEmail", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService, prisma_service_1.PrismaService, nest_mailer_service_1.NestMailerService])
], AppController);
//# sourceMappingURL=app.controller.js.map