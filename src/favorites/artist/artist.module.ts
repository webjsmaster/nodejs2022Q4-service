import { Module } from '@nestjs/common'
import { DB } from 'src/DB/db.service'
import { FavoritesService } from '../favorites.service'
import { ArtistController } from './artist.controller'
import { ArtistService } from './artist.service'

@Module({
	providers: [ArtistService, DB, FavoritesService],
	controllers: [ArtistController],
})
export class ArtistModule {}
