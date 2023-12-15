import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/authentication/auth/jwt.auth.guard';
import { IsUserSelfOrAdminGuard } from 'src/guards/is-user-self-or-admin.guard';
import { IsAdminGuard } from 'src/guards/is-admin.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body(new ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  } 
  @Get()
  @UseGuards(JwtAuthGuard,IsAdminGuard)
  findAll() {
    return this.userService.findAll();
  }
  @UseGuards(JwtAuthGuard,IsUserSelfOrAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard,IsUserSelfOrAdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard,IsUserSelfOrAdminGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
