import { Page } from 'puppeteer';

import { ICollectData } from '../types';
import { logger } from '../utils/logger';

export default async (page: Page, context: ICollectData): Promise<void> => {
  logger.debug('[collect] - page content');
  context.content = await page.content();
};