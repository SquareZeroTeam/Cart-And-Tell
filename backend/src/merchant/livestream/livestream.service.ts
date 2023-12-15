import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateLivestreamDto } from './dto/create-livestream.dto';
import { UpdateLivestreamDto } from './dto/update-livestream.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class LivestreamService {
  constructor(private readonly prisma:PrismaService) {}
  async create(merchantId:number,createLivestreamDto: CreateLivestreamDto) {
    return this.prisma.liveStream.create({data:{...createLivestreamDto,merchantId}});
  }

  async findAll(merchantId:number) {
    return await this.prisma.liveStream.findMany({where:{merchantId}});
  }

  async findOne(merchantId:number,id: string) {
    const liveStream = await this.prisma.liveStream.findUnique({where:{merchantId,roomId:id}});
    if(!liveStream) {throw new HttpException('Live stream not found',404)};
    return liveStream;
  }

  async update(merchantId:number,id: string, updateLivestreamDto: UpdateLivestreamDto) {
    const liveStream = await this.prisma.liveStream.findUnique({where:{merchantId,roomId:id}});
    if (!liveStream) {throw new HttpException('Live stream not found',404)};
    return this.prisma.liveStream.update({where:{merchantId,roomId:id},data:updateLivestreamDto});
  }

  async remove(merchantId:number, id: string) {
    return this.prisma.liveStream.delete({where:{merchantId,roomId:id}});
  }
}
