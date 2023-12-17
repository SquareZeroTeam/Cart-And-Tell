import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
import * as bcrypt from "bcryptjs"
import { NestMailerService } from 'src/nest-mailer/nest-mailer.service';
import { UserStatus } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private prisma:PrismaService, private readonly nestMailer:NestMailerService){};
  async create(createUserDto: CreateUserDto) {
    const trueRegEx = new RegExp("true");
    createUserDto.isMerchant = trueRegEx.test(createUserDto.isMerchant.toString());
    const userExists = await this.prisma.user.findFirst({where:{email:createUserDto.email}});
    if (userExists) {
      throw new BadRequestException({message:['user already exist']});
    }
    bcrypt.hash(createUserDto.password,parseInt(process.env.SECRET_KEY), async (err,hash)=>{
      if (err) {
        throw new HttpException(err,500);
      }
      createUserDto.password = hash;
      const newUser = await this.prisma.user.create({data:{...createUserDto}});
      await this.prisma.emailVerification.create({data:{userId:newUser.id}});
      this.nestMailer.sendEmailVerification(newUser.id);
    })
    return {message:[`Successfully created user ${createUserDto.email}`]};
  }
  async createAsMerchant(createUserDto: CreateUserDto) {
    const trueRegEx = new RegExp("true");
    createUserDto.isMerchant = trueRegEx.test(createUserDto.isMerchant.toString());
    const userExists = await this.prisma.user.findFirst({where:{email:createUserDto.email}});
    if (userExists) {
      throw new BadRequestException({message:['user already exist']});
    }
    bcrypt.hash(createUserDto.password,parseInt(process.env.SECRET_KEY), async (err,hash)=>{
      if (err) {
        throw new HttpException(err,500);
      }
      createUserDto.password = hash;
      const newUser = await this.prisma.user.create({data:{...createUserDto,isMerchant:true}});
      await this.prisma.emailVerification.create({data:{userId:newUser.id}});

    })
    return {message:[`Successfully created user ${createUserDto.email}`]};
  }

  async findAll(status:UserStatus) {

    let query:{[any:string]:string} = {};
    if (status) {
      if (status !== UserStatus.Active && status !== UserStatus.Banned && status !== UserStatus.Removed) {
        throw new BadRequestException('Invalid status')
      }
      query.status = status
    }
    console.log(status);
    return await this.prisma.user.findMany({where:query,select:{merchant:true,id:true,email:true,cart:true,isMerchant:true,status:true,password:true,_count:{select:{cart:true}}}})
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({where:{id}});
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto)
    const trueRegEx = new RegExp("true");
    const updateUserForm:{} = {}
    if (updateUserDto.status) {
      updateUserForm['status'] = updateUserDto.status;
    }
    if (updateUserDto.email) {
      updateUserForm['email'] = updateUserDto.email;
      const userExists = await this.prisma.user.findFirst({where:{email:updateUserDto.email}});
      if (userExists) {
        throw new BadRequestException({message:['user already exist']});
      }
    }
    if (updateUserDto.isMerchant) {
      updateUserDto.isMerchant = trueRegEx.test(updateUserDto.isMerchant.toString());
      updateUserForm['isMerchant'] = updateUserDto.isMerchant
    }
    else {
      updateUserForm['isMerchant'] = false;
    }
    if (updateUserDto.password) {
      bcrypt.hash(updateUserDto.password,parseInt(process.env.SECRET_KEY), async (err,hash)=>{
        if (err) {
          throw new HttpException(err,500);
        }
        updateUserForm['password'] = hash;
        await this.prisma.user.update({where:{id},data:{...updateUserForm}});
      })
    }
    else {
      await this.prisma.user.update({where:{id},data:{...updateUserForm}});
    }
    return {message:[`Successfully updated user ${id}`]};
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({where:{id},include:{cart:true,  merchant:true}});
    if (!user) {
      throw new NotFoundException("User not found");
    }
    if (user.email === process.env.ADMIN_EMAIL) {
      throw new BadRequestException("User is ADMIN, cannot be removed");
    }
    if (user.cart.length > 0) {
      const productIdList = user.cart.map( c => c.id);
      await this.prisma.productItem.deleteMany({where:{id:{in:productIdList}}});
    }
    if (user.merchant) {
      throw new BadRequestException("User is a merchant, please delete the merchant first and its products");
    }
    return await this.prisma.user.delete({where:{id}}); 
  }

  // Non CRUD actions
  async findOneByEmail(email:string) {
    return await this.prisma.user.findUnique({where:{email},include: {merchant:{select:{id:true}},cart:true,_count:{select:{cart:true}}}});
  }
}
