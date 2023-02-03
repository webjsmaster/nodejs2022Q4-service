import { Module } from '@nestjs/common';
import { DB } from 'src/DB/db.service';
import { AlbumsModule } from './albums/albums.module';
import { ArtistModule } from './artist/artist.module';
import { ArtistService } from './artist/artist.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [ArtistModule, AlbumsModule],
  providers: [FavoritesService, DB, ArtistService],
  controllers: [FavoritesController],
})
export class FavoriteModule {}
