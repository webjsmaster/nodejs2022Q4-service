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
import { ArtistsService } from './artists.service'
import { ArtistDto } from './dto/artist.dto'
import { Request } from 'express'

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistService: ArtistsService) {}

  @Get()
  async getAll() {
    return await this.artistService.getAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.getOne(id)
  }

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() CreateArtistDto: ArtistDto) {
    return this.artistService.create(CreateArtistDto)
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() ChangeTrack: ArtistDto,
  ) {
    return this.artistService.update(id, ChangeTrack)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Req() req: Request, @Param('id', ParseUUIDPipe) id: string) {
    const path = req.route.path.split('/')
    return this.artistService.delete(id, path[1])
  }
}
