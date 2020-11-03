import { Page } from 'puppeteer';

import { IDirectionsCollectedData } from '../direction';
import { logger } from '../../utils/logger';

export default async (page: Page, context: IDirectionsCollectedData): Promise<void> => {
  logger.debug('[collect] - page content');
  context.content = await page.content();
};