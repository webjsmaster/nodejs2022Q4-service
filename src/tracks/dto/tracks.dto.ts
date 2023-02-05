import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class TrackDto {
  readonly id: string // uuid v4
  readonly name: string
  readonly artistId: string | null // refers to Artist
  readonly albumId: string | null // refers to Album
  readonly duration: number // integer number

  constructor(partial: Partial<TrackDto>) {
    Object.assign(this, partial)
  }
}

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
