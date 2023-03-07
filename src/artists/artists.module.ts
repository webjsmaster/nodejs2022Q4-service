import { Module } from '@nestjs/common'
import { DB } from 'src/DB/db.service'
import { ArtistsController } from './artists.controller'
import { ArtistsService } from './artists.service'
import { FavoritesService } from '../favorites/favorites.service'
import { AlbumsService } from '../albums/albums.service'
import { TracksService } from '../tracks/tracks.service'

@Module({
  providers: [
    ArtistsService,
    DB,
    FavoritesService,
    AlbumsService,
    TracksService,
  ],
  controllers: [ArtistsController],
  exports: [ArtistsService],
})
export class ArtistsModule {}
