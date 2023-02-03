export class FavoriteDto {
	artists: string[] // favorite artists ids
	albums: string[] // favorite albums ids
	tracks: string[] // favorite tracks ids

	constructor(partial: Partial<FavoriteDto>) {
		Object.assign(this, partial)
	}
}
