import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVerifyEmailDto } from './dto/create-verify-email.dto';
import { UpdateVerifyEmailDto } from './dto/update-verify-email.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class VerifyEmailService {
  constructor (private readonly prisma:PrismaService) {}
  // create(createVerifyEmailDto: CreateVerifyEmailDto) {
  //   return 'This action adds a new verifyEmail';
  // }

  // findAll() {
  //   return `This action returns all verifyEmail`;
  // }

  async findOne(id: string) {
    const verification = await this.prisma.emailVerification.findUnique({where:{id}}); 
    if (!verification) {
      throw new NotFoundException('Invalid Verification Link Token');
    }
    await this.prisma.user.update({where:{id:verification.userId},data:{isEmailVerified:true}});
    await this.prisma.emailVerification.delete({where:{id}});
    return {message:"Email Verified"};
  }

  // update(id: number, updateVerifyEmailDto: UpdateVerifyEmailDto) {
  //   return `This action updates a #${id} verifyEmail`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} verifyEmail`;
  // }
}
