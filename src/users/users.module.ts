import { Module } from '@nestjs/common';
import { DB } from '../DB/db.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, DB],
  controllers: [UsersController],
})
export class UsersModule {}
