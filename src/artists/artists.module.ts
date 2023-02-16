import { Module } from '@nestjs/common'
import { ArtistsController } from './artists.controller'
import { ArtistsService } from './artists.service'
// import { FavoritesService } from '../favorites/favorites.service'
// import { AlbumsService } from '../albums/albums.service'
import { TracksService } from '../tracks/tracks.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArtistsEntity } from './entity/artists.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ArtistsEntity])],
  providers: [ArtistsService, TracksService],
  controllers: [ArtistsController],
  exports: [ArtistsService],
})
export class ArtistsModule {}
