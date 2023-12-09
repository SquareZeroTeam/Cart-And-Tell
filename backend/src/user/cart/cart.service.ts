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
    const product = await this.prisma.product.findUnique({where:{id:createCartDto.products[0]}});
    if (!user) {
      throw new NotFoundException("User not found");
    }
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    const productItem = await this.prisma.productItem.findFirst({where:{productId:createCartDto.products[0],userId}});
    if (!productItem) {
      const newProduct = await this.prisma.productItem.create({
        data:{
          quantity:createCartDto.quantity,
          productId:createCartDto.products[0],
          userId:userId
        }})
    }
    else {
      await this.prisma.productItem.update({
        where:{id:productItem.id},
        data:{
          quantity:{increment:createCartDto.quantity}
        }
      })
    }
    return {message:`Successfully added product ${createCartDto.products[0]} to cart of user:${userId}`};
  }
  async findAll(userId:number) {
    const user = await this.prisma.user.findUnique({where:{id:userId}});
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return await this.prisma.user.findUnique({
      where:{id:userId},
      select:{
        email:true,
        _count:{select:{cart:true}},
        cart:true
      }});
  }
  async increment(id:number,userId:number) {
    const product = await this.prisma.productItem.findUnique({where:{id}});
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    await this.prisma.productItem.update({
      where:{id},
      data:{
        quantity:{increment:1}
      }
    });
    return {message:`Successfully incremented product ${id} to cart of user:${userId}`};
    }
    async decrement(id:number,userId:number) {
      const product = await this.prisma.productItem.findUnique({where:{id}});
      if (!product) {
        throw new NotFoundException("Product not found");
      }
      await this.prisma.productItem.update({
        where:{id},
        data:{
          quantity:{decrement:1}
        }
      });
      return {message:`Successfully decremented product ${id} to cart of user:${userId}`};
      }
  async
  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  async remove(deleteCarDto:DeleteCarDto,userId:number) {
    // Removed many product from productID list
    const deletedProducts = await this.prisma.productItem.deleteMany({where:{userId:userId,productId:{in:deleteCarDto.products}}});
    return deletedProducts;
  }
}
