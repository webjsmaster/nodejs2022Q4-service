import { Module } from '@nestjs/common'
import { FavoriteModule } from './favorites/favorite.module'
import { TracksModule } from './tracks/tracks.module'
import { UsersModule } from './users/users.module'
import { AlbumsModule } from './albums/albums.module'
import { ArtistsModule } from './artists/artists.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config/dist'

@Module({
  imports: [
    UsersModule,
    FavoriteModule,
    TracksModule,
    AlbumsModule,
    ArtistsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'postgres'>('TYPEORM_CONNECTION'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        port: config.get<number>('TYPEORM_PORT'),
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
