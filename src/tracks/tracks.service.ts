import * as crypto from 'node:crypto'
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { DB } from 'src/DB/db.service'
import { TracksEntity } from 'src/DB/entities/DBTracks'
import { CreateTrackDto, TrackDto } from './dto/tracks.dto'
import { FavoritesService } from '../favorites/favorites.service'

@Injectable()
export class TracksService {
  private static db = new DB()

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoriteService: FavoritesService,
  ) {}

  async getAll() {
    const tracksAll = await TracksService.db.tracks.findMany()
    const arr: CreateTrackDto[] = []
    tracksAll.forEach((track) => {
      arr.push(new TrackDto(track))
    })
    return arr
  }

  async getOne(id) {
    const track = await TracksService.db.tracks.findOne({
      key: 'id',
      equals: id,
    })
    if (track) {
      return track
    } else {
      throw new NotFoundException('Track not found')
    }
  }

  async getOneForFav(id) {
    return await TracksService.db.tracks.findOne({
      key: 'id',
      equals: id,
    })
  }

  async getManyAndDelete(id: string, type: 'artistId' | 'albumId') {
    const tracks = await TracksService.db.tracks.findMany({
      key: type,
      equals: id,
    })

    tracks.map((track) => {
      TracksService.db.tracks.change(track.id, { ...track, [type]: null })
    })
  }

  create(tracks: CreateTrackDto) {
    const track = new TrackDto({
      id: crypto.randomUUID(),
      name: tracks.name,
      duration: tracks.duration,
      artistId: tracks.artistId || null,
      albumId: tracks.albumId || null,
    })
    TracksService.db.tracks.create(track as TracksEntity)
    return track
  }

  async update(id: string, trackData: CreateTrackDto) {
    const track: TracksEntity = await TracksService.db.tracks.findOne({
      key: 'id',
      equals: id,
    })

    if (!track) {
      throw new NotFoundException('Track not found')
    } else {
      const newTrack = new TrackDto({
        id: track.id,
        name: trackData.name,
        duration: trackData.duration,
        artistId: trackData.artistId || null,
        albumId: trackData.albumId || null,
      })
      return await TracksService.db.tracks.change(id, newTrack as TracksEntity)
    }
  }

  async delete(id: string) {
    const track: TracksEntity = await TracksService.db.tracks.findOne({
      key: 'id',
      equals: id as unknown as string,
    })

    if (track) {
      const checkFav = await this.favoriteService.check(id, 'track')
      if (checkFav !== -1) {
        this.favoriteService.delete(id, 'track')
      }
      return await TracksService.db.tracks.delete(id)
    } else {
      throw new NotFoundException('Track not found')
    }
  }
}
