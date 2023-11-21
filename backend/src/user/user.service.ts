import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcryptjs"
@Injectable()
export class UserService {
  constructor(private prisma:PrismaService){};
  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findFirst({where:{username:createUserDto.username}});
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
    return {message:[`Successfully created user ${createUserDto.username}`]};
  }

  async findAll() {
    return await this.prisma.user.findMany({select:{id:true,username:true,cart:true,_count:{select:{cart:true}}}})
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


  async findOneByUsername(username:string) {
    return await this.prisma.user.findUnique({where:{username},include: {cart:true,_count:{select:{cart:true}}}});
  }
}
