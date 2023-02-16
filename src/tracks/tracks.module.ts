import { Module } from '@nestjs/common'
import { TracksController } from './tracks.controller'
import { TracksService } from './tracks.service'
// import { FavoritesService } from '../favorites/favorites.service'
// import { AlbumsService } from '../albums/albums.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TracksEntity } from './entity/tracks.entity'
import { ArtistsService } from '../artists/artists.service'

@Module({
  imports: [TypeOrmModule.forFeature([TracksEntity]), ArtistsService],
  providers: [TracksService],
  controllers: [TracksController],
  exports: [TracksService],
})
export class TracksModule {}
