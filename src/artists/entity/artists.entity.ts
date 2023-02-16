import { Column, Entity } from 'typeorm'

@Entity('artist')
export class ArtistEntity {
  @Column({ primary: true })
  id: string

  @Column()
  name: string

  @Column()
  grammy: boolean

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial)
  }
}
