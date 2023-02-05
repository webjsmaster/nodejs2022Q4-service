import { AlbumEntity } from '../../DB/entities/DBAlbum'
import { ArtistEntity } from '../../DB/entities/DBArtists'
import { TracksEntity } from '../../DB/entities/DBTracks'

export class FavoriteDto {
  artists: ArtistEntity[] // favorite artists ids
  albums: AlbumEntity[]
  tracks: TracksEntity[] // favorite tracks ids

  constructor(partial: Partial<FavoriteDto>) {
    Object.assign(this, partial)
  }
}
