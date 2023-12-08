import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
import * as bcrypt from "bcryptjs"
@Injectable()
export class UserService {
  constructor(private prisma:PrismaService){};
  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findFirst({where:{email:createUserDto.email}});
    if (userExists) {
      throw new BadRequestException({message:['user already exist']});
    }
    bcrypt.hash(createUserDto.password,parseInt(process.env.SECRET_KEY), async (err,hash)=>{
      if (err) {
        throw new HttpException(err,500);
      }
      createUserDto.password = hash;
      await this.prisma.user.create({data:{...createUserDto}});
    })
    return {message:[`Successfully created user ${createUserDto.email}`]};
  }

  async findAll() {
    return await this.prisma.user.findMany({select:{id:true,email:true,cart:true,_count:{select:{cart:true}}}})
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({where:{id}});
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // Non CRUD actions
  async findOneByEmail(email:string) {
    return await this.prisma.user.findUnique({where:{email},include: {merchant:{select:{id:true}},cart:true,_count:{select:{cart:true}}}});
  }
}
