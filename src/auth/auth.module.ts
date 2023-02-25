import { forwardRef, Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  controllers: [AuthController],
  providers: [AuthService],

  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'SECRET_KEY',
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
