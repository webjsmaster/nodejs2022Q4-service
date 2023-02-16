import { Column, Entity } from 'typeorm'
import { IsUUID } from 'class-validator'

@Entity('tracks')
export class TrackEntity {
  @Column({ primary: true })
  id: string

  @Column()
  name: string

  @IsUUID()
  @Column({ nullable: true })
  artistId: string | null

  @IsUUID()
  @Column({ nullable: true })
  albumId: string | null

  @Column()
  duration: number

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial)
  }
}
