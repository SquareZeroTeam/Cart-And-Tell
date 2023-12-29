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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../db/prisma/prisma.service");
const bcrypt = require("bcryptjs");
const nest_mailer_service_1 = require("../nest-mailer/nest-mailer.service");
const client_1 = require("@prisma/client");
let UserService = class UserService {
    constructor(prisma, nestMailer) {
        this.prisma = prisma;
        this.nestMailer = nestMailer;
    }
    ;
    async create(createUserDto) {
        createUserDto.email = createUserDto.email.toLowerCase();
        const trueRegEx = new RegExp("true");
        createUserDto.isMerchant = trueRegEx.test(createUserDto.isMerchant.toString());
        const userExists = await this.prisma.user.findFirst({ where: { email: createUserDto.email } });
        if (userExists) {
            throw new common_1.BadRequestException({ message: ['user already exist'] });
        }
        bcrypt.hash(createUserDto.password, parseInt(process.env.SECRET_KEY), async (err, hash) => {
            if (err) {
                throw new common_1.HttpException(err, 500);
            }
            createUserDto.password = hash;
            const newUser = await this.prisma.user.create({ data: { ...createUserDto } });
            await this.prisma.emailVerification.create({ data: { userId: newUser.id } });
            this.nestMailer.sendEmailVerification(newUser.id);
        });
        return { message: [`Successfully created user ${createUserDto.email}`] };
    }
    async createAsMerchant(createUserDto) {
        const trueRegEx = new RegExp("true");
        createUserDto.isMerchant = trueRegEx.test(createUserDto.isMerchant.toString());
        const userExists = await this.prisma.user.findFirst({ where: { email: createUserDto.email } });
        if (userExists) {
            throw new common_1.BadRequestException({ message: ['user already exist'] });
        }
        bcrypt.hash(createUserDto.password, parseInt(process.env.SECRET_KEY), async (err, hash) => {
            if (err) {
                throw new common_1.HttpException(err, 500);
            }
            createUserDto.password = hash;
            const newUser = await this.prisma.user.create({ data: { ...createUserDto, isMerchant: true } });
            await this.prisma.emailVerification.create({ data: { userId: newUser.id } });
        });
        return { message: [`Successfully created user ${createUserDto.email}`] };
    }
    async findAll(status) {
        let query = {};
        if (status) {
            if (status !== client_1.UserStatus.Active && status !== client_1.UserStatus.Banned && status !== client_1.UserStatus.Removed) {
                throw new common_1.BadRequestException('Invalid status');
            }
            query.status = status;
        }
        console.log(status);
        return await this.prisma.user.findMany({ where: query, select: { merchant: true, id: true, email: true, cart: true, isMerchant: true, status: true, password: true, _count: { select: { cart: true } } } });
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        return user;
    }
    async update(id, updateUserDto) {
        console.log(updateUserDto);
        const trueRegEx = new RegExp("true");
        const updateUserForm = {};
        if (updateUserDto.status) {
            updateUserForm['status'] = updateUserDto.status;
        }
        if (updateUserDto.email) {
            updateUserForm['email'] = updateUserDto.email;
            const userExists = await this.prisma.user.findFirst({ where: { email: updateUserDto.email } });
            if (userExists) {
                throw new common_1.BadRequestException({ message: ['user already exist'] });
            }
        }
        if (updateUserDto.isMerchant) {
            updateUserDto.isMerchant = trueRegEx.test(updateUserDto.isMerchant.toString());
            updateUserForm['isMerchant'] = updateUserDto.isMerchant;
        }
        else {
            updateUserForm['isMerchant'] = false;
        }
        if (updateUserDto.password) {
            bcrypt.hash(updateUserDto.password, parseInt(process.env.SECRET_KEY), async (err, hash) => {
                if (err) {
                    throw new common_1.HttpException(err, 500);
                }
                updateUserForm['password'] = hash;
                await this.prisma.user.update({ where: { id }, data: { ...updateUserForm } });
            });
        }
        else {
            await this.prisma.user.update({ where: { id }, data: { ...updateUserForm } });
        }
        return { message: [`Successfully updated user ${id}`] };
    }
    async remove(id) {
        const user = await this.prisma.user.findUnique({ where: { id }, include: { cart: true, merchant: true } });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        if (user.email === process.env.ADMIN_EMAIL) {
            throw new common_1.BadRequestException("User is ADMIN, cannot be removed");
        }
        if (user.cart.length > 0) {
            const productIdList = user.cart.map(c => c.id);
            await this.prisma.productItem.deleteMany({ where: { id: { in: productIdList } } });
        }
        if (user.merchant) {
            throw new common_1.BadRequestException("User is a merchant, please delete the merchant first and its products");
        }
        return await this.prisma.user.delete({ where: { id } });
    }
    async findOneByEmail(email) {
        email = email.toLowerCase();
        return await this.prisma.user.findUnique({ where: { email }, include: { merchant: { select: { id: true, isVerified: true } }, cart: true, _count: { select: { cart: true } } } });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, nest_mailer_service_1.NestMailerService])
], UserService);
//# sourceMappingURL=user.service.js.map