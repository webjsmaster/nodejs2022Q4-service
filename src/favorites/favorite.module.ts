import { forwardRef, Module } from '@nestjs/common'
import { FavoritesController } from './favorites.controller'
import { FavoritesService } from './favorites.service'
import { ArtistsService } from '../artists/artists.service'
import { AlbumsService } from '../albums/albums.service'
import { TracksService } from '../tracks/tracks.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FavoritesEntity } from './entity/favorites.entity'
import { TrackEntity } from '../tracks/entity/tracks.entity'
import { AlbumEntity } from '../albums/entity/albums.entity'
import { ArtistEntity } from '../artists/entity/artists.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity, FavoritesEntity, AlbumEntity, ArtistEntity]), forwardRef(() => AuthModule)],
  providers: [FavoritesService, ArtistsService, AlbumsService, TracksService],
  controllers: [FavoritesController],
})
export class FavoriteModule {}
