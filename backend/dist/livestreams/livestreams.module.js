"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivestreamsModule = void 0;
const common_1 = require("@nestjs/common");
const livestreams_service_1 = require("./livestreams.service");
const livestreams_controller_1 = require("./livestreams.controller");
const prisma_module_1 = require("../db/prisma/prisma.module");
let LivestreamsModule = class LivestreamsModule {
};
exports.LivestreamsModule = LivestreamsModule;
exports.LivestreamsModule = LivestreamsModule = __decorate([
    (0, common_1.Module)({
        controllers: [livestreams_controller_1.LivestreamsController],
        providers: [livestreams_service_1.LivestreamsService],
        imports: [prisma_module_1.PrismaModule]
    })
], LivestreamsModule);
//# sourceMappingURL=livestreams.module.js.map