import { Module } from '@nestjs/common'
import { TracksController } from './tracks.controller'
import { TracksService } from './tracks.service'
import { FavoritesService } from '../favorites/favorites.service'
import { AlbumsService } from '../albums/albums.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TrackEntity } from './entity/tracks.entity'
import { ArtistsService } from '../artists/artists.service'
import { FavoritesEntity } from '../favorites/entity/favorites.entity'
import { AlbumEntity } from '../albums/entity/albums.entity'
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
  providers: [TracksService, FavoritesService, AlbumsService, ArtistsService],
  controllers: [TracksController],
  exports: [TracksService],
})
export class TracksModule {}
