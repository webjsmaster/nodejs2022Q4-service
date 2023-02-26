import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common'
import { MyLogger } from './logging/logger.servise'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { JwtService } from '@nestjs/jwt'

const port = process.env.PORT || 4000

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  })
  await app.listen(port)
  app.useGlobalPipes(new ValidationPipe())
  app.useLogger(app.get(MyLogger))
  const reflector = app.get(Reflector)
  app.useGlobalGuards(new JwtAuthGuard(new JwtService(), reflector))
  console.log('Server started on: ', port)
}

bootstrap()
