import { Injectable, NestMiddleware } from '@nestjs/common'
import { Logger } from '@nestjs/common/services'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP')

  use(req: Request, res: Response, next: NextFunction) {
    const { body, method, originalUrl } = req
    const start = Date.now()

    res.on('finish', () => {
      const { statusCode } = res
      const ms = Date.now() - start
      this.logger.log(
        method + ' \x1b[36mURL:\x1b[32m' + originalUrl + ' \x1b[36mStatusCode:\x1b[32m' + statusCode + ' \x1b[36mBody:\x1b[32m' + JSON.stringify(body) + ' \x1b[33m' + ms + ' ms',
      )
    })
    next()
  }
}
