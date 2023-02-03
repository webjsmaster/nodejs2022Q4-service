import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ArtistService } from './artist/artist.service';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Get()
  async getAll() {
    return this.favoriteService.getAll();
  }

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // addTracks(@Body() addTracks: TrackEvent) {
  // 	return this.favoriteService.create(addTracks)
  // }

  @Get('artist')
  async getArtist() {
    return this.favoriteService.getArtist();
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param('id') id: string) {
    return this.favoriteService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  deleteArtist(@Param('id') id: string) {
    return this.favoriteService.deleteArtist(id);
  }
}
