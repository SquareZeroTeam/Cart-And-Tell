import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LivestreamsService } from './livestreams.service';
import { CreateLivestreamDto } from './dto/create-livestream.dto';
import { UpdateLivestreamDto } from './dto/update-livestream.dto';

@Controller('livestreams')
export class LivestreamsController {
  constructor(private readonly livestreamsService: LivestreamsService) {}

  @Post()
  create(@Body() createLivestreamDto: CreateLivestreamDto) {
    return this.livestreamsService.create(createLivestreamDto);
  }

  @Get()
  findAll() {
    return this.livestreamsService.findAll();
  }

  @Get(':roomId')
  findOne(@Param('roomId') roomId: string) {
    return this.livestreamsService.findOne(roomId);
  }

  @Patch(':roomId')
  update(@Param('roomId') roomId: string, @Body() updateLivestreamDto: UpdateLivestreamDto) {
    return this.livestreamsService.update(+roomId, updateLivestreamDto);
  }

  @Delete(':roomId')
  remove(@Param('roomId') roomId: string) {
    return this.livestreamsService.remove(+roomId);
  }
}
