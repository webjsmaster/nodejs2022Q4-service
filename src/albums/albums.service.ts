import * as crypto from 'node:crypto'
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { DB } from 'src/DB/db.service'
import { AlbumDto, CreateAlbumDto } from './dto/albums.dto'
import { AlbumEntity } from '../DB/entities/DBAlbum'
import { FavoritesService } from '../favorites/favorites.service'
import { TracksService } from '../tracks/tracks.service'

@Injectable()
export class AlbumsService {
  private static db = new DB()

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoriteService: FavoritesService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  async getAll() {
    const albumAll = await AlbumsService.db.album.findMany()
    const arr: CreateAlbumDto[] = []
    albumAll.forEach((track) => {
      arr.push(new AlbumDto(track))
    })
    return arr
  }

  async getOne(id) {
    const album = await AlbumsService.db.album.findOne({
      key: 'id',
      equals: id,
    })

    if (album) {
      return album
    } else {
      throw new NotFoundException('Album not found')
    }
  }

  async getOneForFav(id) {
    return await AlbumsService.db.album.findOne({
      key: 'id',
      equals: id,
    })
  }

  create(tracks: CreateAlbumDto) {
    const album = new AlbumDto({
      id: crypto.randomUUID(),
      name: tracks.name,
      year: tracks.year,
      artistId: tracks.artistId || null,
    })
    return AlbumsService.db.album.create(album as AlbumEntity)
  }

  async update(id: string, data: CreateAlbumDto) {
    const album: AlbumEntity = await AlbumsService.db.album.findOne({
      key: 'id',
      equals: id,
    })

    if (!album) {
      throw new NotFoundException('Album not found')
    } else {
      const newAlbum = new AlbumDto({
        id: album.id,
        name: data.name,
        year: data.year,
        artistId: data.artistId || null,
      })
      return await AlbumsService.db.album.change(id, newAlbum as AlbumEntity)
    }
  }

  async delete(id: string) {
    const album: AlbumEntity = await AlbumsService.db.album.findOne({
      key: 'id',
      equals: id,
    })

    if (album) {
      const checkFav = await this.favoriteService.check(id, 'album')
      if (checkFav !== -1) {
        this.favoriteService.delete(id, 'album')
      }
      await this.tracksService.getManyAndDelete(id, 'albumId')
      await AlbumsService.db.album.delete(id)
      return null
    } else {
      throw new NotFoundException('Album not found')
    }
  }
}
