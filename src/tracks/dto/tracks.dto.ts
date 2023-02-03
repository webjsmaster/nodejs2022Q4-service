import { Exclude } from 'class-transformer';

export class CreateTrackDto {
  readonly id?: string; // uuid v4
  readonly name: string;
  //readonly artistId: string | null // refers to Artist
  readonly albumId: string | null; // refers to Album
  readonly duration: number; // integer number

  @Exclude()
  readonly artistId: string;

  constructor(partial: Partial<CreateTrackDto>) {
    Object.assign(this, partial);
  }
}

// export class TracksDto {
// 	constructor(private Tracks: CreateTrackDto) {}
// }

// import { Exclude } from 'class-transformer'

// export class TrackEntity {
// 	id: string
// 	name: string
// 	duration: string

// 	@Exclude()
// 	artistId: string

// 	constructor(partial: Partial<TrackEntity>) {
// 		Object.assign(this, partial)
// 	}
// }
