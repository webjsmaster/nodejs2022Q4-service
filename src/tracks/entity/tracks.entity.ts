import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { IsUUID } from 'class-validator'
import { AlbumEntity } from '../../albums/entity/albums.entity'
import { ArtistEntity } from '../../artists/entity/artists.entity'

@Entity('tracks')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @IsUUID()
  @Column({ nullable: true })
  artistId: string | null

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({
    name: 'artistId',
    referencedColumnName: 'id',
  })
  artist: string | null

  @IsUUID()
  @Column({ nullable: true })
  albumId: string | null

  @ManyToOne(() => AlbumEntity, (album) => album.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({
    name: 'albumId',
    referencedColumnName: 'id',
  })
  album: string | null

  @Column()
  duration: number

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial)
  }
}
