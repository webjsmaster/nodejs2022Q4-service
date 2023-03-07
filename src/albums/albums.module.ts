import { Module } from '@nestjs/common'
import { AlbumsController } from './albums.controller'
import { AlbumsService } from './albums.service'
import { FavoritesService } from '../favorites/favorites.service'
import { ArtistsService } from '../artists/artists.service'
import { TracksService } from '../tracks/tracks.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AlbumEntity } from './entity/albums.entity'
import { TrackEntity } from '../tracks/entity/tracks.entity'
import { FavoritesEntity } from '../favorites/entity/favorites.entity'
import { ArtistEntity } from '../artists/entity/artists.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrackEntity,
      FavoritesEntity,
      AlbumEntity,
      ArtistEntity,
    ]),
  ],
  providers: [AlbumsService, FavoritesService, ArtistsService, TracksService],
  controllers: [AlbumsController],
  exports: [AlbumsService],
})
export class AlbumsModule {}
