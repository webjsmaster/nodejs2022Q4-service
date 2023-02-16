import { Column, Entity } from 'typeorm'

@Entity('favorite')
export class FavoritesEntity {
  @Column({ primary: true })
  id: string

  @Column('simple-array', { nullable: true })
  albumsId: string[]

  @Column('simple-array', { nullable: true })
  artistsId: string[]

  @Column('simple-array', { nullable: true })
  tracksId: string[]

  constructor(partial: Partial<FavoritesEntity>) {
    Object.assign(this, partial)
  }
}
