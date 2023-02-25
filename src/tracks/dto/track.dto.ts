import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class TrackDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsInt()
  @IsNotEmpty()
  readonly duration: number

  @IsOptional()
  @IsUUID()
  artistId: string | null

  @IsOptional()
  @IsUUID()
  albumId: string | null
}
