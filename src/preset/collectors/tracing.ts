import { Page } from 'puppeteer';

import { IDirectionsCollectedData } from '../direction';
import { logger } from '../../utils/logger';

interface ICollectCoverage {
  startTracing: () => Promise<void>;
  stopTracing: () => Promise<void>;
}

export default async (page: Page, context: IDirectionsCollectedData): Promise<ICollectCoverage> => {
  const startTracing = async () => {
    logger.debug('[collect] - start tracing');
    await page.tracing.start({
      path: '',
      screenshots: true,
      categories: [
        '*',
        'disabled-by-default-devtools.timeline',
        'disabled-by-default-v8.cpu_profiler',
        'disabled-by-default-v8.cpu_profiler.hires',
        'disabled-by-default-devtools.screenshot',
      ],
    });
  };

  const stopTracing = async () => {
    const tracing = JSON.parse(String(await page.tracing.stop()));
    context.tracing = tracing;
  };

  return {
    startTracing,
    stopTracing,
  };
};
