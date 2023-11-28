import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAuthGuard } from 'src/authentication/auth/jwt.auth.guard';
import { IsUserSelfOrAdminGuard } from 'src/guards/is-user-self-or-admin/is-user-self-or-admin.guard';

@UseGuards(JwtAuthGuard,IsUserSelfOrAdminGuard)
@Controller('user/:userId/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body(new ValidationPipe) createCartDto: CreateCartDto, @Param('userId',ParseIntPipe) userId: number) {
    return this.cartService.create(createCartDto,userId);
  }

  @Get()
  findAll(@Param('userId',ParseIntPipe) userId: number) {
    return this.cartService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete('')
  remove(@Body(new ValidationPipe) createCartDto: CreateCartDto, @Param('userId',ParseIntPipe) userId: number) {
    return this.cartService.remove(createCartDto,userId);
  }
}
