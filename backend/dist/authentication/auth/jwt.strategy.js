"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const prisma_service_1 = require("../../db/prisma/prisma.service");
class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }
    ;
    async validate(payload) {
        const prisma = new prisma_service_1.PrismaService();
        const updatedUser = await prisma.user.findUnique({
            where: { id: payload.id },
            include: {
                cart: { include: { product: true }, },
                merchant: { select: { id: true, userId: true, isVerified: true } },
                _count: { select: { cart: true } }
            }
        });
        return {
            id: payload.id,
            email: payload.email,
            ...updatedUser,
        };
    }
}
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map