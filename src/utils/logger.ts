import chalk from 'chalk';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const isLoggingEnabled = process.env.LOG_ENABLED !== 'false';

export class Logger {
  constructor(private scope: string = '') {}

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    const prefix = this.scope ? `[${this.scope}]` : '';
    const levelLabel = {
      info: chalk.blue('[INFO]'),
      warn: chalk.yellow('[WARN]'),
      error: chalk.red('[ERROR]'),
      debug: chalk.gray('[DEBUG]')
    }[level];

    return `${chalk.gray(timestamp)} ${levelLabel} ${prefix} ${message}`;
  }

  info(message: string) {
    if (isLoggingEnabled) console.log(this.formatMessage('info', message));
  }

  warn(message: string) {
    if (isLoggingEnabled) console.warn(this.formatMessage('warn', message));
  }

  error(message: string) {
    if (isLoggingEnabled) console.error(this.formatMessage('error', message));
  }

  debug(message: string) {
    if (isLoggingEnabled) console.debug(this.formatMessage('debug', message));
  }
}
