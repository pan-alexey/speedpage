import * as puppeteer from 'puppeteer';

import { awaitTimeout } from '../helpers';
import { Browser } from '../service/browser';
import { logger } from '../utils/logger';
import { direct } from '../core/direct';
import { sleep } from '../helpers/index';

(async () => {
  // To share cookies between sessions, to bypass captcha, we create a class and use share userDataDir.
  const browserService = new Browser(['--enable-thread-instruction-count']);

  // browser:puppeteer.Browser
  const runner = async () => {
    const urls = [
      'https://www.ozon.ru',
    ];
  
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      logger.mark(`start for url: ${url}`);

      const browser = await browserService.create();
      const collector = direct(browser, {
        url,
      });
  
      const { result, error } = await awaitTimeout(collector, 140000);
  
      if (error) {
        await browserService.close();
        logger.error({ error });
        continue;
      }

      console.log(result);

      await browserService.close();
      logger.mark(`end for url: ${url}`);
    }
  
    await runner();
  };
  runner();
})();




