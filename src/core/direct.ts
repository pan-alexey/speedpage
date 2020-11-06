import * as puppeteer from 'puppeteer';
import { IDirectCollectedData, IDirectOptions } from '../types';
import { logger } from '../utils/logger';
import { sleep } from '../helpers/index';

import { startElapsedTime, stopElapsedTime } from '../collectors/elapsed-time';
import { startWindowMetrics, stopWindowMetrics, showWindowMetrics } from '../collectors/window-metrics';


export const direct = async (browser: puppeteer.Browser, options: IDirectOptions): 
Promise<IDirectCollectedData|null> => {
  logger.info(`start direct for url: ${options.url}`);

  // context is a mutable object
  const context: IDirectCollectedData = {} as IDirectCollectedData;

  logger.info(`init collectors: ${options.url}`);
  startElapsedTime(context);
  
  const page: puppeteer.Page = (await browser.pages())[0];

  const client = await page.target().createCDPSession();
  await client.send('Page.enable');
  await client.send('Network.enable');

  logger.info('Page.enable');
  if (options.extraHeaders) {
    page.setExtraHTTPHeaders(options.extraHeaders);
  }

  if (options.disableJavascript) {
    logger.debug('Disable JavaScript');
    await page.setJavaScriptEnabled(false);
  }

  if (options.clearCache) {
    logger.debug('client clear cookies and cache');
    await client.send('Network.clearBrowserCookies');
    await client.send('Network.clearBrowserCache');
  }

  await client.send('Page.enable');
  await client.send('Network.enable');

  // Inject web-vitals metrics
  startWindowMetrics(page);


  await page.goto(options.url);

  await stopWindowMetrics(page, context);
  stopElapsedTime(context);

  console.log(context);
  logger.info(`stop direct for url: ${options.url}`);

  await sleep(5000);

  await showWindowMetrics(page);


  // await sleep(1000000000);
  return null;
};