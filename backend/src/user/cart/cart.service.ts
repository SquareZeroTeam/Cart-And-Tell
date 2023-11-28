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
      console.log("this is called");
      const newProduct = await this.prisma.productItem.create({
        data:{
          quantity:createCartDto.quantity,
          productId:createCartDto.products[0],
          userId:userId
        }})
        console.log(newProduct);
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
        username:true,
        _count:{select:{cart:true}},
        cart:true
      }});
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  async remove(deleteCarDto:DeleteCarDto,userId:number) {
    // Removed many product from productID list
    const deletedProducts = await this.prisma.productItem.deleteMany({where:{userId:userId,productId:{in:deleteCarDto.products}}});
    console.log(deletedProducts);
    return `Successfully Removed products:${deleteCarDto.products} from cart of user:${userId}`;
  }
}
