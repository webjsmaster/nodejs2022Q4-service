import { Module } from '@nestjs/common'
import { DB } from 'src/DB/db.service'
import { AlbumsController } from './albums.controller'
import { AlbumsService } from './albums.service'
import { FavoritesService } from '../favorites/favorites.service'
import { ArtistsService } from '../artists/artists.service'
import { TracksService } from '../tracks/tracks.service'

@Module({
  providers: [
    AlbumsService,
    DB,
    FavoritesService,
    ArtistsService,
    TracksService,
  ],
  controllers: [AlbumsController],
  exports: [AlbumsService],
})
export class AlbumsModule {}
