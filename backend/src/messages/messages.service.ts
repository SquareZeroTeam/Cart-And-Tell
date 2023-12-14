import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma:PrismaService) {}
  async create(createMessageDto: CreateMessageDto) {
    console.log(createMessageDto);
    const liveStream = await this.prisma.liveStream.findUnique({where:{roomId:createMessageDto.liveStreamRoomId}})
    if (!liveStream) {
      throw new NotFoundException('Live stream not found');
    }
    return await this.prisma.message.create({
      data:createMessageDto,
    include:{user:{select:{email:true,id:true}}}}) 
  }

  async findAll(roomId:string) {
    return await this.prisma.message.findMany({where:{liveStreamRoomId:(roomId) ? roomId : ""},include:{user:{select:{id:true,email:true}}}})
  }

  async joinRoom(roomId:string, userId:number) {
    const liveStream = await this.prisma.liveStream.findUnique({where:{roomId:(roomId)? roomId: ""}});
    const user = await this.prisma.user.findUnique({where:{id:(userId) ? userId : 0}});
    if (!liveStream) {
      throw new NotFoundException('Live stream not found');
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // return this.prisma
     
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
}
