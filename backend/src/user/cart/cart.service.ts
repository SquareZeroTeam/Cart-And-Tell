import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { DeleteCarDto } from './dto/delete-car.dto';

@Injectable()
export class CartService {
  // Adds one Product Item to Cart
  constructor(private readonly prisma:PrismaService){}
  async create(createCartDto: CreateCartDto,userId:number) {
    const user = await this.prisma.user.findUnique({where:{id:userId}});
    const product = await this.prisma.product.findUnique({where:{id:+createCartDto.products[0]}});
    if (!user) {
      throw new NotFoundException("User not found");
    }
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    const productItem = await this.prisma.productItem.findFirst({where:{productId:+createCartDto.products[0],userId}});
    let productCart;
    if (!productItem) {
      productCart = await this.prisma.productItem.create({
        data:{
          quantity:createCartDto.quantity,
          productId:+createCartDto.products[0],
          userId:userId
        }})
    }
    else {
      productCart = await this.prisma.productItem.update({
        where:{id:productItem.id},
        data:{
          quantity:{increment:createCartDto.quantity}
        }
      })
    }
    return productCart;
  }
  async findAll(userId:number) {
    const user = await this.prisma.user.findUnique({where:{id:userId}});
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const cart = await this.prisma.productItem.findMany({where:{userId},include:{product:true}});
    return cart;
  }
  async increment(id:number,userId:number) {
    const product = await this.prisma.productItem.findUnique({where:{id}});
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    return await this.prisma.productItem.update({
      where:{id},
      data:{
        quantity:{increment:1}
      }
    });
    }
    async decrement(id:number,userId:number) {
      const product = await this.prisma.productItem.findUnique({where:{id}});
      if (!product) {
        throw new NotFoundException("Product not found");
      }
      if (product.quantity == 1) {
        return await this.prisma.productItem.findUnique({where:{id}});
      }
      return await this.prisma.productItem.update({
        where:{id},
        data:{
          quantity:{decrement:1}
        }
      });
      }
  // async
  // findOne(id: number) {
  //   return `This action returns a #${id} cart`;
  // }

  // update(id: number, updateCartDto: UpdateCartDto) {
  //   return `This action updates a #${id} cart`;
  // }

  async remove(deleteCarDto:DeleteCarDto,userId:number) {
    // Removed many product from productID list
    deleteCarDto.products = deleteCarDto.products.map(id => +id);
    const deletedProducts = await this.prisma.productItem.deleteMany({where:{id:{in:deleteCarDto.products}}});
    return deletedProducts; }
}
