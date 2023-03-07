import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  readonly login: string

  @IsString()
  @IsNotEmpty()
  readonly password: string
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string

  @IsString()
  @IsNotEmpty()
  newPassword: string
}
