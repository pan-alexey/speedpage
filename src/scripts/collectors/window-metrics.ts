import { Page } from 'puppeteer';
import { ICollectData } from '../../types';
import { logger } from '../../utils/logger';
import * as fs from 'fs';
import * as SafeJsonStringify from 'safe-json-stringify';

export const startWindowMetrics = async (page: Page): Promise<void> => {
  logger.debug('[start collect] - inject browser script');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const collectWindowMetrics = require('./browserscripts/perfomance');
  await Promise.all([
    page.evaluateOnNewDocument(collectWindowMetrics),
    page.evaluate(collectWindowMetrics),
  ]);
};

export const showWindowMetrics = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    // // Highlight elements with score
    // if (window['$$perfomance']) {
    //   window['$$perfomance'].show_cls();
    // }
  });
};

export const stopWindowMetrics = async (page: Page, context: ICollectData, rawPath?: string|null): Promise<void> => {
  logger.debug('[stop collect] - collect window performance');

  const [performance, entries, perfomanceObserver] = await Promise.all([
    page.evaluate(() => JSON.stringify(window.performance)),
    page.evaluate(() => JSON.stringify(window.performance.getEntries())),
    page.evaluate(() => {
      if (window['$$perfomance']) {
         return JSON.stringify(window['$$perfomance'].toJSON());
      }
      return JSON.stringify(null);
    }),
  ]);

  context.browserPerformanceApi = {
    performance: JSON.parse(performance),
    entries: JSON.parse(entries),
    perfomanceObserver: JSON.parse(perfomanceObserver),
  };

  if (rawPath) {
    fs.writeFileSync(rawPath, SafeJsonStringify(context.browserPerformanceApi));
  }
};

