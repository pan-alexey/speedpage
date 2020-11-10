import { Page } from 'puppeteer';
import { ICollectData } from '../../types';
import { logger } from '../../utils/logger';
import * as fs from 'fs';

export const startTracing = async (page: Page): Promise<void> => {
  logger.debug('[start collect] - tracing');
  await page.tracing.start({
    path: '',
    screenshots: true,
    categories: [
      '-*',
      'disabled-by-default-lighthouse',
      'v8',
      'v8.execute',
      'blink.user_timing',
      'devtools.timeline',
      'disabled-by-default-devtools.timeline',
      'disabled-by-default-v8.cpu_profiler',
      'disabled-by-default-v8.cpu_profiler.hires',
      'disabled-by-default-devtools.timeline',
      'disabled-by-default-devtools.timeline.stack',
    ],
  });
};

export const stopTracing = async (page: Page, context: ICollectData, rawPath?:string): Promise<void> => {
  logger.debug('[stop collect] - tracing');
  const tracing = String(await page.tracing.stop());
  context.tracing = JSON.parse(tracing);

  if (rawPath) {
    fs.writeFileSync(rawPath, tracing);
  }
};
