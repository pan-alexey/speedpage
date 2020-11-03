
import { IDirectionsCollectedData } from '../direction';
import { mark } from '../../helpers';
import { logger } from '../../utils/logger';

export default async (context: IDirectionsCollectedData, paths?: string): Promise<void> => {
  logger.debug('[collect] - elapsed time');
  context.elapsedTime = mark.get('__main__');
};