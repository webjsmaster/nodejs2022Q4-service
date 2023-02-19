import * as crypto from 'node:crypto'
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { FavoritesService } from '../favorites/favorites.service'
import { TracksService } from '../tracks/tracks.service'
import { InjectRepository } from '@nestjs/typeorm'
import { AlbumEntity } from './entity/albums.entity'
import { Repository } from 'typeorm'
import { CreateAlbumDto } from './dto/create-albums.dto'
import { UpdateAlbumsDto } from './dto/update-albums.dto'

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @Inject(forwardRef(() => FavoritesService))
    private favoriteService: FavoritesService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  async getAll() {
    return await this.albumRepository.find()
  }

  async getOne(id) {
    const album = await this.albumRepository.findOne({ where: { id } })
    if (album) {
      return album
    } else {
      throw new NotFoundException('Album not found')
    }
  }

  async getOneForFav(id) {
    return await this.albumRepository.findOne({ where: { id } })
  }

  async create(createAlbum: CreateAlbumDto) {
    const album = await this.albumRepository.save({
      id: crypto.randomUUID(),
      name: createAlbum.name,
      year: createAlbum.year,
      artistId: createAlbum.artistId || null,
    })
    return await this.getOne(album.id)
  }

  async update(id: string, data: UpdateAlbumsDto) {
    const album = await this.albumRepository.findOne({
      where: { id },
    })

    if (!album) {
      throw new NotFoundException('Album not found')
    } else {
      await this.albumRepository.update(id, data)
      return await this.getOne(album.id)
    }
  }

  async delete(id: string, path) {
    const album = await this.getOne(id)
    if (album) {
      await this.tracksService.getManyAndDelete(id, path)
      return await this.albumRepository.delete({ id: album.id })
    } else {
      throw new NotFoundException('Album not found')
    }
  }
}
