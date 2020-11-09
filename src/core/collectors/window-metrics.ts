import { Page } from 'puppeteer';
import { ICollectData } from '../../types';
import { logger } from '../../utils/logger';
import * as fs from 'fs';
import * as SafeJsonStringify from 'safe-json-stringify';

export const startWindowMetrics = async (page: Page): Promise<void> => {
  logger.debug('[start collect] - inject browser script');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const collectWindowMetrics = require('./browserscripts/perfomanse');
  await Promise.all([
    page.evaluateOnNewDocument(collectWindowMetrics),
    page.evaluate(collectWindowMetrics),
  ]);
};

export const showWindowMetrics = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    // console.log(window['$$perfomanse']);
    // if (!window['$$perfomanse']) return null;
    // try {
    //   window['$$perfomanse'].show_cls();
    // } catch (error) {}
  });
};

export const stopWindowMetrics = async (page: Page, context: ICollectData, rawPath?: string|null): Promise<void> => {
  logger.debug('[stop collect] - collect window performance');

  const [performance, entries, perfomanseObserver] = await Promise.all([
    page.evaluate(() => JSON.stringify(window.performance)),
    page.evaluate(() => JSON.stringify(window.performance.getEntries())),
    page.evaluate(() => {
      if (window['$$perfomanse']) {
         return JSON.stringify(JSON.stringify(window['$$perfomanse'].toJSON()));
      }
      return JSON.stringify(null);
    }),
  ]);

  context.windowPerformance = {
    performance: JSON.parse(performance),
    entries: JSON.parse(entries),
    perfomanseObserver: JSON.parse(perfomanseObserver),
  };

  if (rawPath) {
    fs.writeFileSync(rawPath, SafeJsonStringify(context.windowPerformance));
  }
};

