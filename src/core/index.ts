import puppeteer from 'puppeteer';
import { logger } from '../utils/logger';
import * as path from 'path';
import * as _ from 'lodash';


export class Metrics {
  constructor() {}
}

export const speedpage = async (metric: Promise<void>| Metrics, timeout = 10000): Promise<void> => {
  const sessionId = _.uniqueId('session-');
  const sessionPaths = path.resolve('./tmp', sessionId);
  const chromeDataDir =  path.resolve(sessionPaths, 'chrome');

  logger.debug('create browser');
  const browser = await puppeteer.launch({
    headless: true,
    userDataDir: chromeDataDir,
    defaultViewport: null,
    devtools: true,
    args: [
      '--hide-scrollbars',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--enable-thread-instruction-count',
    ],
  });

  const timer = setTimeout(async () => {
    logger.debug('metrics timeout');
    browser.close().finally(()=>{
      throw new Error('metrics timeout');
    });
    // Hard kill process not recomended because process().kill() await many time;
    // if (browser.process()) {
    //   console.log('kill browser process');
    //   browser.process().kill();
    // }
    // 
  }, timeout);

  if (metric instanceof Metrics) {
    logger.info('start metrics');

    logger.info('close metrics');
  } else {
    // for jest testing
    await (() => metric)();
  }

  logger.debug('close browser');
  await browser.close();
  clearTimeout(timer);
};
