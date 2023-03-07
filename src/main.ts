import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common'

const port = process.env.PORT || 4000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(port)
  app.useGlobalPipes(new ValidationPipe())
  console.log('Server started on: ', port)
}

bootstrap()
