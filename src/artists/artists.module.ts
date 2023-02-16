import { Module } from '@nestjs/common'
import { ArtistsController } from './artists.controller'
import { ArtistsService } from './artists.service'
// import { FavoritesService } from '../favorites/favorites.service'
// import { AlbumsService } from '../albums/albums.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArtistEntity } from './entity/artists.entity'
import { FavoritesService } from '../favorites/favorites.service'
import { AlbumsService } from '../albums/albums.service'
import { TracksService } from '../tracks/tracks.service'
import { TrackEntity } from '../tracks/entity/tracks.entity'
import { FavoritesEntity } from '../favorites/entity/favorites.entity'
import { AlbumEntity } from '../albums/entity/albums.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrackEntity,
      FavoritesEntity,
      AlbumEntity,
      ArtistEntity,
    ]),
  ],
  providers: [ArtistsService, FavoritesService, AlbumsService, TracksService],
  controllers: [ArtistsController],
  exports: [ArtistsService],
})
export class ArtistsModule {}
