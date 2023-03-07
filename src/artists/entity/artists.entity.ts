import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  grammy: boolean

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial)
  }
}
