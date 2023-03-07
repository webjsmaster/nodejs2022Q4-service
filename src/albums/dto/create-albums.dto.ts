import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator'

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsInt()
  @IsNotEmpty()
  readonly year: number

  @IsOptional()
  @IsUUID()
  @ValidateIf((_, value) => value !== null)
  readonly artistId: string | null // refers to Artist
}
