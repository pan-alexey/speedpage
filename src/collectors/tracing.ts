import { Page } from 'puppeteer';

import { ICollectData } from '../types';
import { logger } from '../utils/logger';

export const startTracing = async (page: Page) => {
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

export const stopTracing = async (page: Page, context: ICollectData) => {
  const tracing = JSON.parse(String(await page.tracing.stop()));
  context.tracing = tracing;
};
