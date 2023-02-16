import { Column, Entity } from 'typeorm'
import { IsInt, IsUUID } from 'class-validator'

@Entity('album')
export class AlbumEntity {
  @Column({ primary: true })
  id: string

  @Column()
  name: string

  @IsInt()
  @Column()
  year: number

  @IsUUID()
  @Column({ nullable: true })
  artistId: string

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial)
  }
}
