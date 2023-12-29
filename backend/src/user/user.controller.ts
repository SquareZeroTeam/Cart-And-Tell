import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/authentication/auth/jwt.auth.guard';
import { IsUserSelfOrAdminGuard } from 'src/guards/is-user-self-or-admin.guard';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import { IsEmailVerifiedGuard } from 'src/guards/is-email-verified.guard';

enum userStatus {
  Active = "Active",
  Removed = "Removed",
  Banned = "Banned"
}
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body(new ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Get()
  @UseGuards(JwtAuthGuard, IsEmailVerifiedGuard, IsAdminGuard)
  findAll(@Query('status') status: userStatus) {
    return this.userService.findAll(status);
  }
  @UseGuards(JwtAuthGuard, IsEmailVerifiedGuard, IsUserSelfOrAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard, IsEmailVerifiedGuard, IsUserSelfOrAdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, IsEmailVerifiedGuard, IsUserSelfOrAdminGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
