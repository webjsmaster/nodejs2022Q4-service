import { Body, ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUsersDto } from '../users/dto/users.dto'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UserEntity } from '../users/entity/users.entity'
import * as process from 'process'
import { RefreshDto } from './dto/refresh.dto'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async login(@Body() userDTO: CreateUsersDto) {
    const user = await this.validateUser(userDTO)
    return {
      token: await this.generateAccessToken(user),
      refreshToken: await this.generateRefreshToken(user),
    }
  }

  async signup(@Body() userDTO: CreateUsersDto) {
    const candidate = await this.usersService.getUserByLogin(userDTO.login)
    if (candidate) {
      throw new HttpException('User with such login exists', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(userDTO.password, +process.env.CRYPT_SALT)
    const user = await this.usersService.create({ ...userDTO, password: hashPassword })
    return { token: await this.generateAccessToken(user) }
  }

  async refresh(refreshData: RefreshDto) {
    const user = this.jwtService.verify(refreshData.refreshToken)
    return {
      token: await this.generateAccessToken(user),
      refreshToken: await this.generateRefreshToken(user),
    }
  }

  async generateAccessToken(user: UserEntity) {
    const payload = { login: user.login, id: user.id }
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY || 'SECRET_KEY',
      expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
    })
  }

  async generateRefreshToken(user: UserEntity) {
    const payload = { login: user.login, id: user.id }
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY || 'SECRET_REFRESH_KEY',
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h',
    })
  }

  private async validateUser(userDTO: CreateUsersDto) {
    const user = await this.usersService.getUserByLogin(userDTO.login)
    if (!user) {
      throw new ForbiddenException('Incorrect email or password')
    }
    const passwordEquals = await bcrypt.compare(userDTO.password, user.password)
    if (passwordEquals) {
      return user
    } else {
      throw new ForbiddenException('Incorrect email or password')
    }
  }
}
