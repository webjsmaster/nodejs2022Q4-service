import { Module } from '@nestjs/common'
import { DB } from 'src/DB/db.service'
import { TracksController } from './tracks.controller'
import { TracksService } from './tracks.service'

@Module({
  providers: [TracksService, DB],
  controllers: [TracksController],
})
export class TracksModule {}
