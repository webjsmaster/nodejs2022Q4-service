import * as crypto from 'node:crypto'
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { DB } from 'src/DB/db.service'
import { UserEntity } from 'src/DB/entities/DBUsers'
import {
  CreateUsersDto,
  FindOneParams,
  UpdateUserDto,
  UserDto,
} from './dto/users.dto'

@Injectable()
export class UsersService {
  private static db = new DB()

  async getAll() {
    const users = await UsersService.db.users.findMany()
    const arr: UserDto[] = []
    users.forEach((u) => {
      arr.push(new UserDto(u))
    })
    return arr
  }

  async getOne(id: FindOneParams) {
    const user = await UsersService.db.users.findOne({
      key: 'id',
      equals: id as unknown as string,
    })
    if (user) {
      return new UserDto(user)
    } else {
      throw new NotFoundException()
    }
  }

  async create(userData: CreateUsersDto) {
    const date = +new Date()
    const user = new UserDto({
      ...userData,
      id: crypto.randomUUID(),
      version: 1,
      createdAt: date,
      updatedAt: date,
    })
    await UsersService.db.users.create(user as UserEntity)
    return user
  }

  async update(id: string, userData: UpdateUserDto) {
    const user: UserEntity = await UsersService.db.users.findOne({
      key: 'id',
      equals: id,
    })

    if (!user) throw new NotFoundException('User not found')

    if (user && userData.oldPassword === user.password) {
      const date = +new Date()
      const newUser = await UsersService.db.users.change(id, {
        password: userData.newPassword,
        version: ++user.version,
        updatedAt: date,
      })
      return new UserDto(newUser)
    } else {
      throw new ForbiddenException('Old password is not correct')
    }
  }

  async delete(id: string) {
    const user: UserEntity = await UsersService.db.users.findOne({
      key: 'id',
      equals: id as unknown as string,
    })

    if (user) {
      return await UsersService.db.users.delete(id)
    } else {
      throw new NotFoundException('User not found')
    }
  }
}
