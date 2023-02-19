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
import { TracksService } from './tracks.service'
import { TrackDto } from './dto/track.dto'

@Controller('track')
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @Get()
  async getAll() {
    return await this.trackService.getAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.getOne(id)
  }

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() CreateTrackDto: TrackDto) {
    return this.trackService.create(CreateTrackDto)
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() ChangeTrack: TrackDto,
  ) {
    return this.trackService.update(id, ChangeTrack)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.delete(id)
  }
}
