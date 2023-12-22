import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { DeleteCarDto } from './dto/delete-car.dto';
import { JwtAuthGuard } from 'src/authentication/auth/jwt.auth.guard';
import { IsUserSelfOrAdminGuard } from 'src/guards/is-user-self-or-admin.guard';

@Controller('user/:userId/cart')
@UseGuards(JwtAuthGuard,IsUserSelfOrAdminGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body(new ValidationPipe) createCartDto: CreateCartDto, @Param('userId',ParseIntPipe) userId: number) {
    return this.cartService.create(createCartDto,userId);
  }
  @Post(":id/increment")
  increment(@Param('id',ParseIntPipe) id: number,@Param('userId',ParseIntPipe) userId: number) {
    return this.cartService.increment(id,userId);
  }
  @Post(":id/decrement")
  decrement(@Param('id',ParseIntPipe) id: number,@Param('userId',ParseIntPipe) userId: number) {
    return this.cartService.decrement(id,userId);
  }
  @Get()
  findAll(@Param('userId',ParseIntPipe) userId: number) {
    return this.cartService.findAll(userId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cartService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(+id, updateCartDto);
  // }

  @Delete()
  remove(@Body(new ValidationPipe) deleteCarDto:DeleteCarDto, @Param('userId',ParseIntPipe) userId: number) {
    return this.cartService.remove(deleteCarDto,userId);
  }
}
