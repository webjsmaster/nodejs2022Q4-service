import { Module } from '@nestjs/common'
import { DB } from 'src/DB/db.service'
import { TracksController } from './tracks.controller'
import { TracksService } from './tracks.service'
import { FavoritesService } from '../favorites/favorites.service'
import { ArtistsService } from '../artists/artists.service'
import { AlbumsService } from '../albums/albums.service'

@Module({
  providers: [
    TracksService,
    DB,
    FavoritesService,
    ArtistsService,
    AlbumsService,
  ],
  controllers: [TracksController],
  exports: [TracksService],
})
export class TracksModule {}
