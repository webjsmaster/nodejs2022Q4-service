import { LoggerService } from '@nestjs/common'
import { logsRecorder } from '../utils/logsRecorder'
import { IBodyLogger } from '../types/logger'

export class MyLogger implements LoggerService {
  log(message: IBodyLogger) {
    logsRecorder(message, 'log')
  }

  error(message: IBodyLogger) {
    logsRecorder(message, 'error')
  }

  warn(message: IBodyLogger) {
    logsRecorder(message, 'warn')
  }

  debug?(message: IBodyLogger) {
    logsRecorder(message, 'debug')
  }

  verbose?(message: IBodyLogger) {
    logsRecorder(message, 'verbose')
  }
}
