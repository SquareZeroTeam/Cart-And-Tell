import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLivestreamDto } from './dto/create-livestream.dto';
import { UpdateLivestreamDto } from './dto/update-livestream.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class LivestreamsService {
  constructor(private readonly prisma:PrismaService){}
  create(createLivestreamDto: CreateLivestreamDto) {
    return 'This action adds a new livestream';
  }

  async findAll() {
    return await this.prisma.liveStream.findMany({include:{merchant:{select:{name:true,image:true,category:true}}}}); 
  }

  async findOne(roomId: string) {
    const liveStream = await this.prisma.liveStream.findUnique({where:{roomId},include:{merchant:{select:{name:true,image:true,category:true}}}});
    if (!liveStream) {
      throw new NotFoundException('Live stream not found');
    }
    return liveStream;
  }

  update(roomId: number, updateLivestreamDto: UpdateLivestreamDto) {
    return `This action updates a #${roomId} livestream`;
  }

  remove(roomId: number) {
    return `This action removes a #${roomId} livestream`;
  }
}
