import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class AlbumDto {
  readonly id: string // uuid v4
  readonly name: string
  readonly year: number
  readonly artistId: string | null // refers to Artist

  constructor(partial: Partial<AlbumDto>) {
    Object.assign(this, partial)
  }
}

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsInt()
  @IsNotEmpty()
  readonly year: number

  readonly artistId: string | null // refers to Artist
}
