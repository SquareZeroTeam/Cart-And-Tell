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
exports.PaymongoService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const prisma_service_1 = require("../../db/prisma/prisma.service");
let PaymongoService = class PaymongoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        await axios_1.default.get('https://api.paymongo.com/', {
            auth: { username: process.env.PayMongo_Secret_Key, password: '' }
        }).then(() => console.log('PayMongo service authenticated'))
            .catch(error => {
            if (error.response) {
                throw new common_1.HttpException(error.response.data.errors[0].code, error.response.status);
            }
            else if (error.request) {
                throw new common_1.InternalServerErrorException();
            }
        });
    }
    async checkout(createPaymongoDto) {
        createPaymongoDto.data = createPaymongoDto.data.map(item => +item);
        console.log(createPaymongoDto.data);
        const productItems = await this.prisma.productItem.findMany({ where: { id: { in: createPaymongoDto.data } }, include: { product: true } });
        const filteredData = productItems.map(item => {
            return {
                name: item.product.name,
                amount: item.product.amount * 100,
                quantity: item.quantity,
                currency: "PHP",
                image: item.product.image,
            };
        });
        console.log(filteredData);
        const checkoutData = {
            data: {
                attributes: {
                    line_items: filteredData,
                    payment_method_types: ["card", "gcash", "paymaya"],
                    send_email_receipt: true
                }
            }
        };
        const paymongoRes = await axios_1.default.post("https://api.paymongo.com/v1/checkout_sessions", checkoutData, {
            headers: {
                "Content-Type": "application/json",
            },
            auth: {
                username: process.env.PayMongo_Secret_Key,
                password: ""
            }
        })
            .then(res => res.data)
            .catch(err => err.response.data);
        return { checkoutLink: paymongoRes.data.attributes.checkout_url };
    }
    async buynow(createPaymongoDto) {
        createPaymongoDto.data = createPaymongoDto.data.map(item => +item);
        console.log(createPaymongoDto.data);
        const productItems = await this.prisma.product.findMany({ where: { id: { in: createPaymongoDto.data } } });
        const filteredData = productItems.map(item => {
            return {
                name: item.name,
                amount: item.amount * 100,
                quantity: 1,
                currency: "PHP",
                image: item.image,
            };
        });
        console.log(filteredData);
        const checkoutData = {
            data: {
                attributes: {
                    line_items: filteredData,
                    payment_method_types: ["card", "gcash", "paymaya"],
                    send_email_receipt: true
                }
            }
        };
        const paymongoRes = await axios_1.default.post("https://api.paymongo.com/v1/checkout_sessions", checkoutData, {
            headers: {
                "Content-Type": "application/json",
            },
            auth: {
                username: process.env.PayMongo_Secret_Key,
                password: ""
            }
        })
            .then(res => res.data)
            .catch(err => err.response.data);
        return { checkoutLink: paymongoRes.data.attributes.checkout_url };
    }
};
exports.PaymongoService = PaymongoService;
exports.PaymongoService = PaymongoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymongoService);
//# sourceMappingURL=paymongo.service.js.map