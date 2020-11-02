const logLevel = Number(process.env.LOG_LEVEL) || ELogLevel.debug;
import { ELogLevel } from './utils/logger';

export {
  logLevel,
};