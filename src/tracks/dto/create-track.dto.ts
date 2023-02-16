import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsInt()
  @IsNotEmpty()
  readonly duration: number

  readonly artistId: string | null // refers to Artist
  readonly albumId: string | null // refers to Album
}
