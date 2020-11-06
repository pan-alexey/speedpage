import { Page } from 'puppeteer';
import { ICollectData } from '../../types';
import { logger } from '../../utils/logger';

export default async (page: Page, context: ICollectData, key: string): Promise<void> => {
  logger.mark(`collect metric ${key}`);
  context.metrics[key] = await page.metrics();
};
