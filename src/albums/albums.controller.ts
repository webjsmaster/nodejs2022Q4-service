import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AlbumsService } from './albums.service'
import { CreateAlbumDto } from './dto/albums.dto'
import { Request } from 'express'

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumService: AlbumsService) {}

  @Get()
  async getAll() {
    return await this.albumService.getAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.getOne(id)
  }

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() CreateTrackDto: CreateAlbumDto) {
    return this.albumService.create(CreateTrackDto)
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() ChangeAlbum: CreateAlbumDto,
  ) {
    return this.albumService.update(id, ChangeAlbum)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Req() req: Request, @Param('id', ParseUUIDPipe) id: string) {
    const path = req.route.path.split('/')
    return this.albumService.delete(id, path[1])
  }
}
