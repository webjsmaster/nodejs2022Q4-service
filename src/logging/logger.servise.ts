import { LoggerService } from '@nestjs/common'
import { appendFileSync, createReadStream, createWriteStream } from 'fs'

export class MyLogger implements LoggerService {
  log(message: string, ...optionalParams: any[]) {
    const date = new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(new Date())
    // const time = new Intl.DateTimeFormat('ru-RU', options).format(currentDate)
    console.log(`\x1b[32m[Nest] - \x1b[37m${date} \x1b[32m${message} \x1b[0m`)
    // console.log('🎗️ [optionalParams 0 ]', optionalParams)
    // console.log('🎗️ [optionalParams 1 ]', params.log)

    // const access = createWriteStream('api.access.log')
    // process.stdout.write = process.stderr.write = access.write.bind(message)

    appendFileSync('test.txt', `${message}\t${date}\n\n`);
    // console.log('📢 [logger.servise.ts:22]', process.stdout)

  }

  error(message: any, ...optionalParams: any[]) {
    console.log('📢 [message]', message)
    console.log('📢 [optionalParams]', optionalParams)
  }

  warn(message: any, ...optionalParams: any[]) {}

  debug?(message: any, ...optionalParams: any[]) {}

  verbose?(message: any, ...optionalParams: any[]) {}
}
