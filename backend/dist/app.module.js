"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./authentication/auth/auth.module");
const user_module_1 = require("./user/user.module");
const merchant_module_1 = require("./merchant/merchant.module");
const paymongo_module_1 = require("./microservices/paymongo/paymongo.module");
const products_module_1 = require("./products/products.module");
const prisma_module_1 = require("./db/prisma/prisma.module");
const supabase_module_1 = require("./microservices/supabase/supabase.module");
const category_module_1 = require("./category/category.module");
const messages_module_1 = require("./messages/messages.module");
const livestreams_module_1 = require("./livestreams/livestreams.module");
const mailer_1 = require("@nestjs-modules/mailer");
const ejs_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/ejs.adapter");
const nest_mailer_service_1 = require("./nest-mailer/nest-mailer.service");
const verify_email_module_1 = require("./verify-email/verify-email.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot(),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.gmail.com',
                    auth: {
                        user: process.env.SMTP_USERNAME,
                        pass: process.env.SMTP_PASSWORD
                    }
                },
                defaults: {
                    from: '"nest-modules" <modules@nestjs.com>',
                },
                template: {
                    dir: __dirname + '/templates',
                    adapter: new ejs_adapter_1.EjsAdapter(),
                    options: {
                        strict: false,
                    },
                },
            }), user_module_1.UserModule, auth_module_1.AuthModule, paymongo_module_1.PaymongoModule, merchant_module_1.MerchantModule, products_module_1.ProductsModule, prisma_module_1.PrismaModule, supabase_module_1.SupabaseModule, category_module_1.CategoryModule, messages_module_1.MessagesModule, livestreams_module_1.LivestreamsModule, verify_email_module_1.VerifyEmailModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, nest_mailer_service_1.NestMailerService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map