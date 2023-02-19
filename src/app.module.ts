import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TracksModule } from './tracks/tracks.module'
import { ArtistsModule } from './artists/artists.module'
import { AlbumsModule } from './albums/albums.module'
import { FavoriteModule } from './favorites/favorite.module'
import { typeOrmConfig } from './typeorm.config'

@Module({
  imports: [
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavoriteModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
