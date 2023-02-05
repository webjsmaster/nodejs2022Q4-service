import * as crypto from 'node:crypto'
import { Injectable, NotFoundException } from '@nestjs/common'
import { DB } from 'src/DB/db.service'
import { TracksEntity } from 'src/DB/entities/DBTracks'
import { CreateTrackDto, TrackDto } from './dto/tracks.dto'

@Injectable()
export class TracksService {
  constructor(private db: DB) {}

  async getAll() {
    const tracksAll = await this.db.tracks.findMany()
    const arr: CreateTrackDto[] = []
    tracksAll.forEach((track) => {
      arr.push(new TrackDto(track))
    })
    return arr
  }

  async getOne(id) {
    const track = await this.db.tracks.findOne({ key: 'id', equals: id })
    if (track) {
      return track
    } else {
      throw new NotFoundException('Track not found')
    }
  }

  create(tracks: CreateTrackDto) {
    const track = new TrackDto({
      id: crypto.randomUUID(),
      name: tracks.name,
      duration: tracks.duration,
      artistId: tracks.artistId || null,
      albumId: tracks.albumId || null,
    })
    this.db.tracks.create(track as TracksEntity)
    return track
  }

  async update(id: string, trackData: CreateTrackDto) {
    const track: TracksEntity = await this.db.tracks.findOne({
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
      return await this.db.tracks.change(id, newTrack as TracksEntity)
    }
  }

  async delete(id: string) {
    const track: TracksEntity = await this.db.tracks.findOne({
      key: 'id',
      equals: id as unknown as string,
    })

    if (track) {
      return await this.db.tracks.delete(id)
    } else {
      throw new NotFoundException('Track not found')
    }
  }
}
