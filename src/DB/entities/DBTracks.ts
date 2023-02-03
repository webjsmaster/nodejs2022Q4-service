import DBEntity from './DBEntity'

export type TracksEntity = {
	id: string // uuid v4
	name: string
	artistId: string | null // refers to Artist
	albumId: string | null // refers to Album
	duration: number // integer number
}
export type CreateTracksDTO = Omit<TracksEntity, 'id'>
export type ChangeTracksDTO = Partial<Omit<TracksEntity, 'id'>>

export default class DBTracks extends DBEntity<
	TracksEntity,
	CreateTracksDTO,
	ChangeTracksDTO
> {
	async create(dto: TracksEntity) {
		this.entities.push(dto)
		return dto
	}
}
