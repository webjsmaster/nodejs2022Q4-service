import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
} from '@nestjs/common'
import { FavoritesService } from './favorites.service'
import { Request } from 'express'

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Get()
  async getAll() {
    return this.favoriteService.getAll()
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Req() req: Request, @Param('id', ParseUUIDPipe) id: string) {
    const path = req.route.path.split('/')
    return this.favoriteService.add(id, path[2])
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Req() req: Request, @Param('id', ParseUUIDPipe) id: string) {
    const path = req.route.path.split('/')
    return this.favoriteService.delete(id, path[2])
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Req() req: Request, @Param('id', ParseUUIDPipe) id: string) {
    const path = req.route.path.split('/')
    return this.favoriteService.add(id, path[2])
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Req() req: Request, @Param('id', ParseUUIDPipe) id: string) {
    const path = req.route.path.split('/')
    return this.favoriteService.delete(id, path[2])
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrack(@Req() req: Request, @Param('id', ParseUUIDPipe) id: string) {
    const path = req.route.path.split('/')
    return this.favoriteService.add(id, path[2])
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Req() req: Request, @Param('id', ParseUUIDPipe) id: string) {
    const path = req.route.path.split('/')
    return this.favoriteService.delete(id, path[2])
  }
}
