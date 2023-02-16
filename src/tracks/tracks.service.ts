import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTrackDto } from './dto/create-track.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { TrackEntity } from './entity/tracks.entity'
import { Repository } from 'typeorm'
import { UpdateTrackDto } from './dto/update-track.dto'
import * as crypto from 'node:crypto'
import { FavoritesEntity } from '../favorites/entity/favorites.entity'

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
    // @Inject(forwardRef(() => FavoritesService))
    // private favoriteService: FavoritesService,

    @InjectRepository(FavoritesEntity)
    private readonly favoriteRepository: Repository<FavoritesEntity>,
  ) {}

  async getAll() {
    return await this.trackRepository.find()
  }

  async getOne(id) {
    const track = await this.trackRepository.findOne({ where: { id } })
    if (track) {
      return track
    } else {
      throw new NotFoundException('Track not found')
    }
  }

  async getOneForFav(id) {
    return await this.trackRepository.findOne({ where: { id } })
  }

  async getManyAndDelete(id: string, type: 'artistId' | 'albumId') {
    // const tracks = await this.trackRepository.findMany({
    //   key: type,
    //   equals: id,
    // })
    //
    // const tracks = await this.trackRepository.find({
    //   where: { type, id }
    // })
    //
    // tracks.map((track) => {
    //   TracksService.db.tracks.change(track.id, { ...track, [type]: null })
    // })
    return { id, type }
  }

  async create(tracks: CreateTrackDto): Promise<TrackEntity> {
    const track = await this.trackRepository.save({
      id: crypto.randomUUID(),
      name: tracks.name,
      duration: tracks.duration,
      artistId: tracks.artistId || null,
      albumId: tracks.albumId || null,
    })
    return await this.getOne(track.id)
  }

  async update(id: string, trackData: UpdateTrackDto) {
    const track = await this.trackRepository.findOne({
      where: { id },
    })

    if (!track) {
      throw new NotFoundException('Track not found')
    } else {
      await this.trackRepository.update(id, trackData)
      return await this.getOne(track.id)
    }
  }

  async delete(id: string) {
    const track = await this.getOne(id)
    if (track) {
      return await this.trackRepository.delete({ id: track.id })
    } else {
      throw new NotFoundException('Track not found')
    }
  }
}
