import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common'
import { MyLogger } from './logging/logger.servise'

const port = process.env.PORT || 4000

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  })
  await app.listen(port)
  app.useGlobalPipes(new ValidationPipe())
  app.useLogger(app.get(MyLogger))
  console.log('Server started on: ', port)
}

bootstrap()
