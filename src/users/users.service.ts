import { ForbiddenException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { CreateUsersDto, UpdateUserDto } from './dto/users.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entity/users.entity'
import { DeleteResult, Repository } from 'typeorm'

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name)

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    this.logger.log('tset')
    return await this.userRepository.find()
  }

  async getOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (user) {
      return user
    } else {
      throw new NotFoundException()
    }
  }

  async create(userInput: CreateUsersDto): Promise<UserEntity> {
    const user = await this.userRepository.save({
      ...userInput,
      version: 1,
    })
    return await this.getOne(user.id)
  }

  async update(id: string, userInput: UpdateUserDto): Promise<UserEntity> {
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
    const user: UserEntity = await this.getOne(id)
    if (user) {
      return await this.userRepository.delete({ id: user.id })
    } else {
      throw new NotFoundException('User not found')
    }
  }

  async getUserByLogin(login: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { login } })
    return !!user ? user : null
  }

  async testing() {
    return new NotFoundException('User not found')
  }
}
