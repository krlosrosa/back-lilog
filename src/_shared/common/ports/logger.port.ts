export interface LogContext extends Record<string, any> {}

export interface IAppLogger {
  info: (message: string, context?: LogContext) => void;
  warn: (message: string, context?: LogContext) => void;
  error: (message: string, context?: LogContext) => void;
  debug: (message: string, context?: LogContext) => void;
  withContext: (context: LogContext) => IAppLogger;
}
