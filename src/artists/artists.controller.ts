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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ArtistsService } from './artists.service'
import { CreateArtistDto } from './dto/artists.dto'

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
  create(@Body() CreateArtistDto: CreateArtistDto) {
    return this.artistService.create(CreateArtistDto)
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() ChangeTrack: CreateArtistDto,
  ) {
    return this.artistService.update(id, ChangeTrack)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.delete(id)
  }
}
