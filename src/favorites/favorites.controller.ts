import { ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, Req, UseInterceptors } from '@nestjs/common'
import { Request } from 'express'
import { FavoritesService } from './favorites.service'

type Path = 'artist' | 'album' | 'track'

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
  addArtist(@Req() req: Request, @Param('path') path: Path, @Param('id', ParseUUIDPipe) id: string) {
    if (path === 'artist' || path === 'album' || path === 'track') {
      return this.favoriteService.add(id, path)
    } else {
      throw new NotFoundException({
        statusCode: 404,
        message: `Cannot POST ${req.originalUrl}`,
        error: 'Not Found',
      })
    }
  }

  @Delete(':path/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Req() req: Request, @Param('path') path: Path, @Param('id', ParseUUIDPipe) id: string) {
    if (path === 'artist' || path === 'album' || path === 'track') {
      return this.favoriteService.delete(id, path)
    } else {
      throw new NotFoundException({
        statusCode: 404,
        message: `Cannot DELETE ${req.originalUrl}`,
        error: 'Not Found',
      })
    }
  }
}
