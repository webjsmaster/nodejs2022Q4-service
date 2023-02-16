import { Column, Entity } from 'typeorm'

@Entity('tracks')
export class TracksEntity {
  @Column({ primary: true })
  id: string

  @Column()
  name: string

  @Column({ nullable: true })
  artistId: string | null

  @Column({ nullable: true })
  albumId: string | null

  @Column()
  duration: number

  constructor(partial: Partial<TracksEntity>) {
    Object.assign(this, partial)
  }
}
