import { Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'src/db/prisma/prisma.service';
@Injectable()
export class NestMailerService {
    constructor(private readonly mailerService:MailerService,private readonly prisma:PrismaService) {}

    public async sendEmailVerification(userId:number) {
        const emailVerification = await this.prisma.emailVerification.findFirst({where:{userId}});
        if (!emailVerification) {
            throw new NotFoundException("Email verification not found");
        }
        const user = await this.prisma.user.findUnique({where:{id:userId}});
        if (!user) {
            throw new NotFoundException("User not found");
        }

        const url = `${process.env.FRONTEND_URL}/verify-email/${emailVerification.id}`;
        this.mailerService.sendMail({
            to: user.email,
            from:`${process.env.SMTP_EMAIL}`,
            subject:"Cart & Tell User Email Verification",
            template:'emailVerification',
            context:{
                username: user.email.split('@')[0],
                link:url,
            }
        })
    }
}
