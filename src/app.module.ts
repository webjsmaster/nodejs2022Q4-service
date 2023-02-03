import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DB } from './DB/db.service';
import { FavoriteModule } from './favorites/favorite.module';
import { TracksController } from './tracks/tracks.controller';
import { TracksService } from './tracks/tracks.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, FavoriteModule],
  controllers: [AppController, TracksController],
  providers: [AppService, TracksService],
})
export class AppModule {}
