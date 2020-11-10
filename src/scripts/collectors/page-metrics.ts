import { Page } from 'puppeteer';
import { ICollectData } from '../../types';
import { logger } from '../../utils/logger';

export const pageMetrics =  async (page: Page, context: ICollectData, key: string): Promise<void> => {
  logger.mark(`[collect] - page metric ${key}`);
  if (!context.metrics) {
    context.metrics = {};
  }
  context.metrics[key] = await page.metrics();
};


