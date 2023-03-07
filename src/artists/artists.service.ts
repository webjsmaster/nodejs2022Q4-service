import * as crypto from 'node:crypto'
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { DB } from 'src/DB/db.service'
import { ArtistDto, CreateArtistDto } from './dto/artists.dto'
import { ArtistEntity } from '../DB/entities/DBArtists'
import { FavoritesService } from '../favorites/favorites.service'
import { TracksService } from '../tracks/tracks.service'

@Injectable()
export class ArtistsService {
  private static db = new DB()

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoriteService: FavoritesService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  async getAll() {
    const artistsAll = await ArtistsService.db.artist.findMany()
    const arr: CreateArtistDto[] = []
    artistsAll.forEach((track) => {
      arr.push(new ArtistDto(track))
    })
    return arr
  }

  async getOne(id) {
    const artist = await ArtistsService.db.artist.findOne({
      key: 'id',
      equals: id,
    })
    if (artist) {
      return artist
    } else {
      throw new NotFoundException('Artist not found')
    }
  }

  async getOneForFav(id) {
    return await ArtistsService.db.artist.findOne({
      key: 'id',
      equals: id,
    })
  }

  create(data: CreateArtistDto) {
    const artist = new ArtistDto({
      id: crypto.randomUUID(),
      name: data.name,
      grammy: data.grammy,
    })
    ArtistsService.db.artist.create(artist as ArtistEntity)
    return artist
  }

  async update(id: string, data: CreateArtistDto) {
    const artist: ArtistEntity = await ArtistsService.db.artist.findOne({
      key: 'id',
      equals: id,
    })

    if (!artist) {
      throw new NotFoundException('Artist not found')
    } else {
      const newArtist = new ArtistDto({
        id: artist.id,
        name: data.name,
        grammy: data.grammy,
      })
      return await ArtistsService.db.artist.change(
        id,
        newArtist as ArtistEntity,
      )
    }
  }

  async delete(id: string) {
    const artist: ArtistEntity = await ArtistsService.db.artist.findOne({
      key: 'id',
      equals: id as unknown as string,
    })

    if (artist) {
      const checkFav = await this.favoriteService.check(id, 'artist')
      if (checkFav !== -1) {
        this.favoriteService.delete(id, 'artist')
      }

      await this.tracksService.getManyAndDelete(id, 'artistId')

      return await ArtistsService.db.artist.delete(id)
    } else {
      throw new NotFoundException('Artist not found')
    }
  }
}
