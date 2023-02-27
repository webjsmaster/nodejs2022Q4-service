import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TracksModule } from './tracks/tracks.module'
import { ArtistsModule } from './artists/artists.module'
import { AlbumsModule } from './albums/albums.module'
import { FavoriteModule } from './favorites/favorite.module'
import { typeOrmConfig } from './typeorm.config'
import { MyLogger } from './logging/logger.servise'
import { LoggerMiddleware } from './middleware/logger.middleware'
import { AuthModule } from './auth/auth.module'
import { APP_FILTER, APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { AllExceptionsFilter } from './exceptioFilter/http-exception.filter'

@Module({
  imports: [
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavoriteModule,
    MyLogger,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
