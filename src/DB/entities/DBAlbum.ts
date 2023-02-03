import DBEntity from './DBEntity'

export type AlbumEntity = {
	id: string; // uuid v4
	name: string;
	year: number;
	artistId: string | null; // refers to Artist
}
export type CreateAlbumDTO = Omit<AlbumEntity, 'id'>
export type ChangeAlbumDTO = Partial<Omit<AlbumEntity, 'id'>>

export default class DBTracks extends DBEntity<
	AlbumEntity,
	CreateAlbumDTO,
	ChangeAlbumDTO
> {
	async create(dto: AlbumEntity) {
		this.entities.push(dto)
		return dto
	}
}
