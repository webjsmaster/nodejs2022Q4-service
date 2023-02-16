import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsInt()
  @IsNotEmpty()
  readonly year: number

  @IsUUID()
  readonly artistId: string | null // refers to Artist
}
