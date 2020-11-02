import * as puppeteer from 'puppeteer';
import { logger } from '../utils/logger';

export const metrics = async (callback: Promise<void>, timeout = 10000): Promise<void> => {
  logger.debug('create browser');
  const browser = await puppeteer.launch({
    // headless: true,
    userDataDir: './tmp',
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

    logger.debug('close browser');
    await browser.close();
    // Hard kill process
    // if (browser.process()) {
    //   console.log('kill browser process');
    //   browser.process().kill();
    // }
  }, timeout);

  logger.debug('close browser');
  await browser.close();
  clearTimeout(timer);
};
