import { Page } from 'puppeteer';
import { ICollectData } from '../../types';
import { logger } from '../../utils/logger';

export const startWindowMetrics = async (page: Page): Promise<void> => {
  logger.debug('[collect] - inject browser script');
  const collectWindowMetrics = require('./browserscripts/perfomanse');
  await Promise.all([
    page.evaluateOnNewDocument(collectWindowMetrics),
    page.evaluate(collectWindowMetrics),
  ]);
};

export const stopWindowMetrics = async (page: Page, context: ICollectData): Promise<void> => {
  logger.debug('[collect] - collect window performance');

  // const [performance, entries, perfomanseObserver] = await Promise.all([
  //   page.evaluate(() => JSON.stringify(window.performance)),
  //   page.evaluate(() => JSON.stringify(window.performance.getEntries())),
  //   page.evaluate(() => {
  //      return JSON.stringify(null);
  //     //  if (window['$$perfomanse'])
  //     // return JSON.stringify(window.$$perfomanse.getPerfomance());
  //   }),
  // ]);

  // context.windowPerformance = {
  //   performance: JSON.parse(performance),
  //   entries: JSON.parse(entries),
  //   perfomanseObserver: JSON.parse(perfomanseObserver)
  // }
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
