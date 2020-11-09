
import { ICollectData } from '../../types';
import { logger } from '../../utils/logger';

export const startElapsedTime = (context: ICollectData): void => {
  context.elapsedTime = {
    start: 0,
    finish: 0,
  };
  context.elapsedTime['start'] = Number(new Date());
  logger.mark('[start collect] - elapsed time');
};

export const stopElapsedTime = (context: ICollectData): void => {
  context.elapsedTime['finish'] = Number(new Date());
  logger.mark('[stop collect] - elapsed time');
};