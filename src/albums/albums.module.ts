import { Module } from '@nestjs/common'
import { DB } from 'src/DB/db.service'
import { AlbumsController } from './albums.controller'
import { TracksService } from './tracks.service'

@Module({
  providers: [TracksService, DB],
  controllers: [AlbumsController],
})
export class TracksModule {}
