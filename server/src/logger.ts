import fs from 'fs';
import path from 'path';

const LOG_DIR = process.env.LOG_DIR || './logs';

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

function getLogFile(): string {
  const date = new Date().toISOString().split('T')[0];
  return path.join(LOG_DIR, `after-attack-${date}.log`);
}

function formatMessage(level: string, ...args: any[]): string {
  const timestamp = new Date().toISOString();
  const message = args.map(arg => {
    if (typeof arg === 'object') {
      try {
        return JSON.stringify(arg);
      } catch {
        return String(arg);
      }
    }
    return String(arg);
  }).join(' ');
  return `[${timestamp}] [${level}] ${message}`;
}

function writeLog(level: string, ...args: any[]): void {
  const msg = formatMessage(level, ...args);
  
  console.log(msg);
  
  try {
    fs.appendFileSync(getLogFile(), msg + '\n');
  } catch (err) {
    console.error('Failed to write log to file:', err);
  }
}

export const logger = {
  info: (...args: any[]) => writeLog('INFO', ...args),
  warn: (...args: any[]) => writeLog('WARN', ...args),
  error: (...args: any[]) => writeLog('ERROR', ...args),
  debug: (...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      writeLog('DEBUG', ...args);
    }
  }
};

export default logger;
