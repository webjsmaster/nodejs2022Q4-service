import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/DB/entities/DBUsers';
import { UsersService } from './users.service';

//nest g controller users

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.usersService.getOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() CreateUserDTO: CreateUserDTO) {
    return this.usersService.create(CreateUserDTO);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  update(@Body() CreateUserDTO: CreateUserDTO) {
    return this.usersService.create(CreateUserDTO);
  }
}
