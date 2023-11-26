import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma:PrismaService) {}
  async create(createCartDto: CreateCartDto,userId:number) {
    const user = await this.prisma.user.findUnique({where:{id:userId}});
    const product = await this.prisma.product.findUnique({where:{id:createCartDto.productId}});
    if (!user) {
      throw new NotFoundException("User not found");
    }
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    const addedCart = await this.prisma.user.update({
      where:{id:userId},
      data:{
        cart: {
          upsert:{
            where: {
              productId: createCartDto.productId,
            },
          create:{
            quantity:1,
            productId:createCartDto.productId,
          },
          update:{
            quantity:{
              increment:1
            }
          }
        }}
      }})
      return {message:`Successfully added product ${createCartDto.productId} to cart`};
  }
  async findAll(userId:number) {
    const user = await this.prisma.user.findUnique({where:{id:userId}});
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return await this.prisma.user.findUnique({where:{id:userId},include:{cart:true}});
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
