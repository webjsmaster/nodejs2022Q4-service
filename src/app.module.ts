import { Module } from '@nestjs/common'
import { FavoriteModule } from './favorites/favorite.module'
import { TracksModule } from './tracks/tracks.module'
import { UsersModule } from './users/users.module'
import { AlbumsModule } from './albums/albums.module'
import { ArtistsModule } from './artists/artists.module'

@Module({
  imports: [
    UsersModule,
    FavoriteModule,
    TracksModule,
    AlbumsModule,
    ArtistsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
