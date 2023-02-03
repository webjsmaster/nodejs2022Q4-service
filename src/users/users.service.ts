import * as crypto from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { DB } from 'src/DB/db.service';
import { CreateUserDTO, UserEntity } from 'src/DB/entities/DBUsers';
import { UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private db: DB) {}

  async getAll() {
    const users = await this.db.users.findMany();
    const arr: UserDto[] = [];
    users.forEach((u) => {
      arr.push(new UserDto(u));
    });
    return arr;
  }

  async getOne(id: string) {
    const user = await this.db.users.findOne({ key: 'id', equals: id });
    return new UserDto(user);
  }

  async create(users: CreateUserDTO) {
    const date = +new Date();
    const user = new UserDto({
      ...users,
      id: crypto.randomUUID(),
      version: 1,
      createdAt: date,
      updatedAt: date,
    });
    await this.db.users.create(user as UserEntity);
    return user;
  }
}
