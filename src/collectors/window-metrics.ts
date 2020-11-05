import { Page } from 'puppeteer';
import { ICollectData } from '../types';
import { logger } from '../utils/logger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import { perfomanseObserver } from './browserscripts/perfomanse'

export const startWindowMetrics = async (page: Page): Promise<void> => {
  logger.debug('[collect] - inject browser script');
  await Promise.all([
    await page.evaluateOnNewDocument(()=>perfomanseObserver()),
    await page.evaluate(()=>perfomanseObserver()),
  ]);
};

export const stopWindowMetrics = async (page: Page, context: ICollectData): Promise<void> => {
  logger.debug('[collect] - collect window performance');
  const [performance, entries] = await Promise.all([
    page.evaluate(() => JSON.stringify(window.performance)),
    page.evaluate(() => JSON.stringify(window.performance.getEntries())),
  ]);

  context.windowPerformance.performance = JSON.parse(performance);
  context.windowPerformance.entries = JSON.parse(entries);

  const perfomanseObserver = await page.evaluate(() => {
    if (window.$$getPerfomanse) return JSON.stringify(null);
    return JSON.stringify(window.$$getPerfomanse());
  });

  context.windowPerformance.perfomanseObserver = JSON.parse(perfomanseObserver);
};
