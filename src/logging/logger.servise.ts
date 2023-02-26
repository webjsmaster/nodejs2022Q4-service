import { LoggerService } from '@nestjs/common'
import { logsRecorder } from '../utils/logsRecorder'
import { currentDate } from '../utils/date-format'
import { IBodyLogger } from '../types/logger'

export class MyLogger implements LoggerService {
  log(message: IBodyLogger) {
    logsRecorder(message, currentDate, 'log')
  }

  error(message: any, ...optionalParams: any[]) {
    logsRecorder(message, currentDate, 'error')
  }

  warn(message: any, ...optionalParams: any[]) {
    logsRecorder(message, currentDate, 'warn')
  }

  debug?(message: any, ...optionalParams: any[]) {
    logsRecorder(message, currentDate, 'debug')
  }

  verbose?(message: any, ...optionalParams: any[]) {
    logsRecorder(message, currentDate, 'verbose')
  }
}
