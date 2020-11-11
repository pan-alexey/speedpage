import { awaitTimeout, sleep } from '../../helpers';
import { Browser } from '../../service/browser';
import { logger } from '../../utils/logger';
import { collector } from './collector';
import { metrics } from './metrics';
import { uid } from '../../helpers';
import * as path from 'path';
import { IDirectCollectedData } from './types';

(async () => {
  // To share cookies between sessions, to bypass captcha, we create a class and use share userDataDir.
  const userDataDir = path.resolve('tmp', 'chromium', uid());
  const browserService = new Browser(['--enable-thread-instruction-count'], userDataDir);

  // browser:puppeteer.Browser
  const runner = async () => {
    const urls = [
      'https://www.ozon.ru',
    ];
  
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      logger.mark(`start for url: ${url}`);

      const tmpDir = path.resolve('tmp', 'metrics', uid());
      const browser = await browserService.create();

      const options = {
        url,
        platform: 'mobile',
        tmpDir,
        saveRaw: true,
        enableBrowserPerfomanceApi: true,
      };
  
      const { result, error } = await awaitTimeout(collector(browser, options), 140000);

      if (error) {
        await browserService.close();
        logger.error({ error });
        continue;
      }

      const resultMetrics = await metrics(result as IDirectCollectedData);
    
      console.log(resultMetrics);

      await sleep(500);

      await browserService.close();
      logger.mark(`end for url: ${url}`);
    }
  
    await runner();
  };
  runner();
})();




