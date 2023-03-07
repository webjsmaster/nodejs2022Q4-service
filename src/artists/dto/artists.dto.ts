import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class ArtistDto {
  id: string // uuid v4
  name: string
  grammy: boolean

  constructor(partial: Partial<ArtistDto>) {
    Object.assign(this, partial)
  }
}

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsBoolean()
  @IsNotEmpty()
  readonly grammy: boolean
}
