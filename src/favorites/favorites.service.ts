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
import { InjectRepository } from '@nestjs/typeorm'
import { FavoritesEntity } from './entity/favorites.entity'
import { Repository } from 'typeorm'
import { ArtistEntity } from '../artists/entity/artists.entity'
import { AlbumEntity } from '../albums/entity/albums.entity'
import { TrackEntity } from 'src/tracks/entity/tracks.entity'

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private readonly favoriteRepository: Repository<FavoritesEntity>,
    @Inject(forwardRef(() => ArtistsService))
    private artistService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private albumService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private trackService: TracksService,
  ) {}

  doesExist = async (id, array) => {
    for (const item of array) {
      if (item.id === id) {
        return true
      }
    }
    return false
  }

  async getAll() {
    const favs = await this.favoriteRepository.find()

    if (favs.length === 0) {
      return await this.favoriteRepository.save({
        artists: [],
        albums: [],
        tracks: [],
      })
    } else {
      return favs[0]
    }
  }

  async add(id: string, type: 'artist' | 'album' | 'track') {
    let findOne: ArtistEntity | AlbumEntity | TrackEntity | string

    let exists: boolean

    const favs = await this.favoriteRepository.find()

    switch (type) {
      case 'artist': {
        findOne = await this.artistService.getOneForFav(id)
        exists = await this.doesExist(id, favs[0].artists)
        break
      }
      case 'album': {
        findOne = await this.albumService.getOneForFav(id)
        exists = await this.doesExist(id, favs[0].albums)
        break
      }
      case 'track': {
        findOne = await this.trackService.getOneForFav(id)
        exists = await this.doesExist(id, favs[0].tracks)
        break
      }
    }

    if (!findOne) {
      throw new UnprocessableEntityException()
    }

    if (!exists) {
      favs[0][type + 's'].push(findOne)
      await this.favoriteRepository.save(favs)
      return { message: 'Added to favorites list' }
    } else {
      throw new UnprocessableEntityException()
    }
  }

  async delete(id: string, type: 'artist' | 'album' | 'track') {
    const favs = await this.favoriteRepository.find()
    const exists = await this.doesExist(id, favs[0][type + 's'])

    console.log('📌:', exists)

    if (exists) {
      favs[0][type + 's'] = [...favs[0][type + 's']].filter(
        (el) => el.id !== id,
      )
      await this.favoriteRepository.save(favs[0])
      return { message: 'Deleted to favorites list' }
    } else {
      throw new NotFoundException()
    }
  }
}
