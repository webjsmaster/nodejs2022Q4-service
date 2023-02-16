import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity('users')
export class UserEntityPG {
  @Column({ primary: true })
  id: string

  @Column()
  login: string

  @Exclude()
  @Column()
  password: string

  @Column()
  version: number

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date

  constructor(partial: Partial<UserEntityPG>) {
    Object.assign(this, partial)
  }
}
