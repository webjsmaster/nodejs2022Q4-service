import { Controller, Get } from '@nestjs/common'
import { AlbumsService } from './albums.service'

@Controller('--')
export class AlbumsController {
	constructor(private readonly artistService: AlbumsService) {}

	@Get()
	getAll() {
		const test = this.artistService.getAll()
		console.log('📢 [artist.controller.ts:12]', test)
		return 'Artist'
	}
}
