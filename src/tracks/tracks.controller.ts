import * as crypto from 'node:crypto';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/tracks.dto';

@Controller('tracks')
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll() {
    return await this.trackService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() CreateTrackDto: CreateTrackDto) {
    return this.trackService.create(CreateTrackDto);
  }
}
