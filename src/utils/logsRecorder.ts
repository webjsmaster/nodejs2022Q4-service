import { appendFileSync, statSync, existsSync } from 'fs'
import { writeFile, rename } from 'fs/promises'
import { resolve } from 'path'
import { currentDate } from './date-format'
import { IBodyLogger, TypeLogger } from '../types/logger'
import * as os from 'os'

export const logsRecorder = async (params: IBodyLogger, type: TypeLogger) => {
  const consoleLog = (color) => {
    console.log(
      `${color}[Nest] - \x1b[37m${currentDate()} ${color}URL:${params.originalUrl} <> Method:${params.method}`,
      `<> Body:${JSON.stringify(params.body)} <> StatusCode:${params.statusCode} <> \x1b[31m\x1b[43m+${params.ms}ms\x1b[0m`,
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

  const file = resolve(process.cwd() + '/' + type + '-file.txt')
  const message =
    `[Nest] - ${currentDate()} URL:${params.originalUrl} - <> Method:${params.method}` +
    ' <> Body:' +
    JSON.stringify(params.body) +
    ` <> StatusCode:${params.statusCode} <> ${params.ms}ms` +
    os.EOL

  if (!existsSync(file)) {
    await writeFile(file, '', { flag: 'wx' })
  }

  appendFileSync(file, message)

  const fileSizeInBytes = statSync(file).size

  const fileSize = +process.env.SIZE_LOG_FILE || 10000

  if (fileSizeInBytes > fileSize) {
    const newFile = resolve(process.cwd() + '/' + type + '-history-' + Date.now() + '-file.txt')
    await rename(file, newFile)
  }
}
