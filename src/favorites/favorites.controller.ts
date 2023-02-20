import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common'
import { FavoritesService } from './favorites.service'


@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}


  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll() {
    return this.favoriteService.getAll()
  }

  @Post(':path/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param('path') path:  'artist' | 'album' | 'track', @Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.add(id, path)
  }

  @Delete(':path/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('path') path: 'artist' | 'album' | 'track', @Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.delete(id, path)
  }

}
