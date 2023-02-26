export interface IBodyLogger {
  method: string
  originalUrl: string
  statusCode: string
  body: string
  ms: string
}

export type TypeLogger = 'log' | 'error' | 'warn' | 'verbose' | 'debug'
