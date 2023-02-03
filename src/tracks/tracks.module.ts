import { Module } from '@nestjs/common';
import { DB } from 'src/DB/db.service';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  imports: [DB],
  providers: [TracksService],
  controllers: [TracksController],
})
export class TracksModule {}
