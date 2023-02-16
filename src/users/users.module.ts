import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UserEntityPG } from './entity/users.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntityPG])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
