import { appendFileSync, statSync } from 'fs'
import { resolve } from 'path'
import { currentDate } from './date-format'
import { IBodyLogger, TypeLogger } from '../types/logger'
import * as os from 'os'

export const logsRecorder = async (params: IBodyLogger, date: string, type: TypeLogger) => {
  const consoleLog = (color) => {
    console.log(
      `${color}[Nest] - \x1b[37m${currentDate} ${color}URL:${params.originalUrl} <> Method:${params.method}`,
      '<> Body:',
      params.body,
      `<> StatusCode:${params.statusCode} <> \x1b[31m\x1b[43m+${params.ms}ms\x1b[0m`,
    )
  }

  switch (type) {
    case 'log': {
      consoleLog('\x1b[32m')
      break
    }
    case 'error': {
      consoleLog('\x1b[31m')
      break
    }
    case 'debug': {
      consoleLog('\x1b[36m')
      break
    }
    case 'warn': {
      consoleLog('\x1b[33m')
      break
    }
    case 'verbose': {
      consoleLog('\x1b[90m')
      break
    }
    default: {
      consoleLog('\x1b[37m')
    }
  }

  const file = resolve(process.cwd() + '/' + 'log.txt')

  // if (fileSizeInBytes > 1000) {

  // }

  const fileSizeInBytes = statSync(file).size

  console.log('🕹️ [FILE======>]', file)

  const message =
    `[Nest] - ${currentDate} URL:${params.originalUrl} - <> Method:${params.method}` +
    ' <> Body:' +
    JSON.stringify(params.body) +
    ` <> StatusCode:${params.statusCode} <> ${params.ms}ms` +
    os.EOL

  console.log('🌝 Bytes:', fileSizeInBytes)
  appendFileSync(file, message)
}
