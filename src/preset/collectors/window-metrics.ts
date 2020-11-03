import { Page } from 'puppeteer';
import { IDirectionsCollectedData } from '../direction';
import { logger } from '../../utils/logger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const browserScript = require('././browserscripts/perfomanse');

interface ICollectCoverage {
  injectObserver: () => Promise<void>;
  stopMetrics: () => Promise<void>;
}

export default async (page: Page, context: IDirectionsCollectedData): Promise<ICollectCoverage> => {
  const injectObserver = async () => {
    logger.debug('[collect] - inject browser script');
    await Promise.all([
      await page.evaluateOnNewDocument(browserScript),
      await page.evaluate(browserScript),
    ]);
  };

  const stopMetrics = async () => {
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

  return {
    injectObserver,
    stopMetrics,
  };
};
