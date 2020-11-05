/* eslint-disable @typescript-eslint/no-explicit-any */
import * as puppeteer from 'puppeteer';
import { logger } from '../utils/logger';

class Browser {
  private browser: puppeteer.Browser | undefined;
  private options: any;

  async create(args: Array<string>, userDataDir?: string):Promise<puppeteer.Browser> {
    logger.debug('create browser');
    const options: any = {
      headless: true,
      defaultViewport: null,
      devtools: true,
      args: [
        '--hide-scrollbars',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        ...args,
      ],
    };

    if (userDataDir) {
      options.userDataDir = userDataDir;
    };

    this.options = options;

    // hard kill old instanse
    if (this.browser && this.browser.process()) {
      this.browser.process().kill();
    }

    return await this.start();
  }

  async start(): Promise<puppeteer.Browser> {
    logger.debug('try start browser');
    const browser = await puppeteer.launch(this.options);
    logger.debug('success start browser');
    this.browser = browser;
    return browser;
  }

  async restart(): Promise<void> {
    logger.debug('try restart browser');
    if (!this.browser){
      logger.debug('browser not init');
      return;
    }

    await this.close();
    await this.start();
  }

  async close(): Promise<void> {
    logger.debug('try stop browser');
    if (!this.browser){
      logger.debug('browser not init');
      return;
    }

    await this.browser.close();
    logger.debug('stop browser');
  }
}

export { Browser };