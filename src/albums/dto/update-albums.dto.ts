import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'

export class UpdateAlbumsDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsInt()
  @IsNotEmpty()
  readonly year: number

  @IsUUID()
  @IsOptional()
  readonly artistId: string
}
