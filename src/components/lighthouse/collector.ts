/* eslint-disable @typescript-eslint/no-explicit-any */
import * as puppeteer from 'puppeteer';
import * as lighthouse from 'lighthouse';
import { logger } from '../../utils/logger';
import { lighthouseConfig } from '../../config';
import { ILighthouseOptions } from './types';

export const collector = async (browser: puppeteer.Browser, options: ILighthouseOptions): 
Promise<{
  trace: any;
  lhr: any;
}> => {
  logger.info(`start lighthouse for url: ${options.url}`);

  // custom methods
  const page = await browser.newPage();
  const client = await page.target().createCDPSession();
  await client.send('Page.enable');
  await client.send('Network.enable');

  if (options.clearCache) {
    await client.send('Network.clearBrowserCache');
  }

  if (options.clearCookies) {
    await client.send('Network.clearBrowserCookies');
  }

  if (options.clearCache) {
    await client.send('Storage.clearDataForOrigin', {
      origin: '*',
      storageTypes: 'all',
    });
  }

  if (options.cookies) {
    await page.setCookie(...options.cookies);
  }

  await page.close();

  const { lhr, artifacts } = await lighthouse(options.url, {
    port: (new URL(browser.wsEndpoint())).port,
    logLevel: 'error',
    recordTrace: true,
    maxWaitForLoad: 15 * 1000,
    extraHeaders: options.extraHeaders,
  }, lighthouseConfig(options.platform));

  const trace = artifacts.traces.defaultPass;

  return {
    trace,
    lhr,
  };
};
