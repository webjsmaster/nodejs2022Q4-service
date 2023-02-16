import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateUsersDto, UpdateUserDto } from './dto/users.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntityPG } from './entity/users.entity'
import { DeleteResult, Repository } from 'typeorm'
import * as crypto from 'node:crypto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntityPG)
    private readonly userRepository: Repository<UserEntityPG>,
  ) {}

  async getAll(): Promise<UserEntityPG[]> {
    return await this.userRepository.find()
  }

  async getOne(id: string): Promise<UserEntityPG> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (user) {
      return user
    } else {
      throw new NotFoundException()
    }
  }

  async create(userInput: CreateUsersDto): Promise<UserEntityPG> {
    const user = await this.userRepository.save({
      id: crypto.randomUUID(),
      ...userInput,
      version: 1,
    })
    return await this.getOne(user.id)
  }

  async update(id: string, userInput: UpdateUserDto): Promise<UserEntityPG> {
    const user = await this.getOne(id)
    if (!user) throw new NotFoundException('User not found')
    if (userInput.oldPassword === user.password) {
      await this.userRepository.update(id, {
        password: userInput.newPassword,
        version: ++user.version,
      })
      return await this.getOne(user.id)
    } else {
      throw new ForbiddenException('Old password is not correct')
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    const user: UserEntityPG = await this.getOne(id)
    if (user) {
      return await this.userRepository.delete({ id: user.id })
    } else {
      throw new NotFoundException('User not found')
    }
  }
}
