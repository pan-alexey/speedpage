import { logLevel } from '../config';

type TPayload = string | Record<string, unknown>;

export const enum ELogLevel {
  debug = 4,
  info = 3,
  warning = 2,
  error = 1
}

const log = (payload: TPayload, level: ELogLevel) => {
  if (level <= logLevel) {
    const message = typeof payload === 'string' ? { message: payload } : payload;
    console.log(message);
  }
};

export const logger = {
    info: (payload: TPayload): void => log(payload, ELogLevel.info),
    debug: (payload: TPayload): void => log(payload, ELogLevel.debug),
    warning: (payload: TPayload): void => log(payload, ELogLevel.warning),
    error: (payload: TPayload): void => log(payload, ELogLevel.error),
    mark: (mark: string | number): void => {
      const message = `[${new Date()}] - ` + mark;
      logger.debug(message);
    },
};
