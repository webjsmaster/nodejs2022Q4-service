import { Module } from '@nestjs/common'
import { DB } from 'src/DB/db.service'
import { AlbumsController } from './albums.controller'
import { AlbumsService } from './albums.service'

@Module({
	providers: [AlbumsService, DB],
	controllers: [AlbumsController],
})
export class AlbumsModule {}
