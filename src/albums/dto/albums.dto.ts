import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsInt()
  @IsNotEmpty()
  readonly year: number

  readonly artistId: string | null // refers to Artist
}
