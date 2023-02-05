import { Exclude } from 'class-transformer'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class UserDto {
  readonly id?: string // uuid v4
  @IsString()
  @IsNotEmpty()
  readonly login: string
  readonly version: number // integer number, increments on update
  readonly createdAt: number // timestamp of creation
  readonly updatedAt: number // timestamp of last update
  @Exclude()
  @IsString()
  @IsNotEmpty()
  readonly password: string

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial)
  }
}

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  readonly login: string

  @IsString()
  @IsNotEmpty()
  readonly password: string

  constructor(partial: Partial<CreateUsersDto>) {
    Object.assign(this, partial)
  }
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string // previous password

  @IsString()
  @IsNotEmpty()
  newPassword: string // new password
}

export class FindOneParams {
  @IsUUID()
  id: string
}
