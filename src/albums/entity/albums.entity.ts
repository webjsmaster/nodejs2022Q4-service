import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { IsInt, IsUUID } from 'class-validator'
import { ArtistEntity } from '../../artists/entity/artists.entity'

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @IsInt()
  @Column()
  year: number

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

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial)
  }
}
