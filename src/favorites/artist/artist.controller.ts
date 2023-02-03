import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common'
import { ArtistService } from './artist.service'

@Controller('--')
export class ArtistController {
	constructor(private readonly artistService: ArtistService) {}

	@Get()
	getAll() {
		return this.artistService.getAll()
	}

	@Post(':id')
	@HttpCode(HttpStatus.CREATED)
	create(@Param('id') id: string) {
		return 'create' + id
	}
}
