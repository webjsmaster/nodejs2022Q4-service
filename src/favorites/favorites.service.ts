import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { ArtistsService } from '../artists/artists.service'
import { AlbumsService } from '../albums/albums.service'
import { TracksService } from '../tracks/tracks.service'
import { FavoriteDto } from './dto/favotite.dto'

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private artistService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private albumService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private trackService: TracksService,
  ) {}

  async getAll() {
    const favs = FavoritesService.db.favorites.getFavorites()

    const arr = new FavoriteDto({
      albums: await Promise.all(
        favs.albums.map(async (id): Promise<AlbumEntity> => {
          return await this.albumService.getOne(id)
        }),
      ),
      tracks: await Promise.all(
        favs.tracks.map(async (id): Promise<TracksEntity> => {
          return await this.trackService.getOne(id)
        }),
      ),
      artists: await Promise.all(
        favs.artists.map(async (id): Promise<ArtistEntity> => {
          return await this.artistService.getOne(id)
        }),
      ),
    })

    return arr
  }

  async add(id: string, type: 'artist' | 'album' | 'track') {
    let findOne: ArtistEntity | AlbumEntity | TracksEntity | string

    switch (type) {
      case 'artist': {
        findOne = await this.artistService.getOneForFav(id)
        break
      }
      case 'album': {
        findOne = await this.albumService.getOneForFav(id)
        break
      }
      case 'track': {
        findOne = await this.trackService.getOneForFav(id)
        break
      }
    }

    const check = FavoritesService.db.favorites.find(id, type)

    if (check !== -1) {
      throw new UnprocessableEntityException()
    }

    if (!!findOne) {
      FavoritesService.db.favorites.add(id, type)
      return { message: 'Added to favorites list' }
    } else {
      throw new UnprocessableEntityException()
    }
  }

  async delete(id: string, type: 'artist' | 'album' | 'track') {
    const check = FavoritesService.db.favorites.find(id, type)
    if (check !== -1) {
      FavoritesService.db.favorites.delete(id, type)
      return { message: 'Deleted to favorites list' }
    } else {
      throw new NotFoundException()
    }
  }

  async check(id: string, type: 'artist' | 'album' | 'track') {
    return FavoritesService.db.favorites.find(id, type)
  }
}
