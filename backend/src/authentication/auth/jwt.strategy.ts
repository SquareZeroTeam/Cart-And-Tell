import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { PrismaService } from "src/db/prisma/prisma.service";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    };
    async validate(payload: any) {
        const updatedUser = await this.prisma.user.findUnique({
            where: { id: payload.id },
            include: {
                cart: { include: { product: true }, },
                merchant: { select: { id: true, userId: true, isVerified: true } },
                _count: { select: { cart: true } }
            }
        })
        return {
            id: payload.id,
            email: payload.email,
            ...updatedUser,
        };
    }
}