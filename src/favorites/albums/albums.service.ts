import { Injectable } from '@nestjs/common'
import { DB } from 'src/DB/db.service'

@Injectable()
export class AlbumsService {
	constructor(private db: DB) {}

	async getAll() {
		const fav = await this.db.users.create({
			id: 'tsets',
			login: 'tset',
			createdAt: 3253,
			password: 'agasg',
			updatedAt: 255,
			version: 1,
		})

		console.log('📢 [artist.service.ts:11]', fav)

		//return arr
	}
}
