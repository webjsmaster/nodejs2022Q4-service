import { Injectable, NestMiddleware } from '@nestjs/common'
import { Logger } from '@nestjs/common/services'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger()

  use(req: Request, res: Response, next: NextFunction) {
    const { body, method, originalUrl } = req
    const start = Date.now()

    res.on('finish', () => {
      const { statusCode } = res
      const ms = Date.now() - start
      if (statusCode.toString().startsWith('2')) {
        this.logger.log({ method, originalUrl, statusCode, body, ms })
      } else if (statusCode.toString().startsWith('4')) {
        this.logger.warn({ method, originalUrl, statusCode, body, ms })
      } else if (statusCode.toString().startsWith('5')) {
        this.logger.error({ method, originalUrl, statusCode, body, ms })
      } else {
        this.logger.verbose({ method, originalUrl, statusCode, body, ms })
      }
    })
    next()
  }
}
