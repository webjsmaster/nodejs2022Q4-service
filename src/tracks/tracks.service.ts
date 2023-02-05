import * as crypto from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { DB } from 'src/DB/db.service';
import { TracksEntity } from 'src/DB/entities/DBTracks';
import { CreateTrackDto } from './dto/tracks.dto';

@Injectable()
export class TracksService {
  constructor(private db: DB) {}

  async getAll() {
    const tracksAll = await this.db.tracks.findMany();
    const arr: CreateTrackDto[] = [];
    tracksAll.forEach((track) => {
      arr.push(new CreateTrackDto(track));
    });
    return arr;
  }

  create(tracks: CreateTrackDto) {
    const track = new CreateTrackDto({
      ...tracks,
      id: crypto.randomUUID(),
    });
    this.db.tracks.create(track as TracksEntity);
    return track;
  }
}
