import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class ArtistDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsBoolean()
  @IsNotEmpty()
  readonly grammy: boolean
}
