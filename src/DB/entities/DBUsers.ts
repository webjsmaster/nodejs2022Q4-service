import DBEntity from './DBEntity'

export type UserEntity = {
	id: string // uuid v4
	login: string
	password: string
	version: number // integer number, increments on update
	createdAt: number // timestamp of creation
	updatedAt: number // timestamp of last update
}

export type CreateUserDTO = Omit<UserEntity, 'id'>
export type ChangeUserDTO = Partial<Omit<UserEntity, 'id'>>
export default class DBUsers extends DBEntity<
	UserEntity,
	ChangeUserDTO,
	CreateUserDTO
> {
	async create(dto: UserEntity) {
		this.entities.push(dto)
		return dto
	}
}
