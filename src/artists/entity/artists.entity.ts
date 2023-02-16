import { Column, Entity } from 'typeorm'

@Entity('tracks')
export class ArtistsEntity {
  @Column({ primary: true })
  id: string

  @Column()
  name: string

  @Column()
  grammy: boolean

  constructor(partial: Partial<ArtistsEntity>) {
    Object.assign(this, partial)
  }
}
