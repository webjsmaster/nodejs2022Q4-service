import * as crypto from 'node:crypto'
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateArtistDto } from './dto/create-artist.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { ArtistsEntity } from './entity/artists.entity'
import { DeleteResult, Repository } from 'typeorm'
import { UpdateArtistDto } from './dto/update-artist.dto'
import { TracksService } from '../tracks/tracks.service'

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistsEntity)
    private readonly artistRepository: Repository<ArtistsEntity>,
    // @Inject(forwardRef(() => FavoritesService))
    // private favoriteService: FavoritesService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  async getAll(): Promise<ArtistsEntity[]> {
    return await this.artistRepository.find()
  }

  async getOne(id): Promise<ArtistsEntity> {
    const user = await this.artistRepository.findOne({ where: { id } })
    if (user) {
      return user
    } else {
      throw new NotFoundException()
    }
  }

  async getOneForFav(id): Promise<ArtistsEntity> {
    return await this.artistRepository.findOne({ where: { id } })
  }

  async create(data: CreateArtistDto): Promise<ArtistsEntity> {
    const artist = await this.artistRepository.save({
      id: crypto.randomUUID(),
      ...data,
    })
    return await this.getOne(artist.id)
  }

  async update(id: string, data: UpdateArtistDto): Promise<ArtistsEntity> {
    const artist = await this.getOne(id)

    if (!artist) {
      throw new NotFoundException('Artist not found')
    } else {
      await this.artistRepository.update(id, data)
      return await this.getOne(id)
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    const artist = await this.getOne(id)
    if (artist) {
      return await this.artistRepository.delete({ id: artist.id })
    } else {
      throw new NotFoundException('Artist not found')
    }
  }
}
