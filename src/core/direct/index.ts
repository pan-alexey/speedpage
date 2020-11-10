import { awaitTimeout } from '../../helpers';
import { Browser } from '../../service/browser';
import { logger } from '../../utils/logger';
import { collector } from '../direct/collector';
import { metrics } from '../direct/metrics';
import { uid } from '../../helpers';
import * as path from 'path';
import { IDirectCollectedData } from '../../types';

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

      const { result, error } = await awaitTimeout(collector(browser, {
        url,
        tmpDir,
        saveRaw: true,
        enableBrowserPerfomanceApi: true,
      }), 140000);
  
      if (error) {
        await browserService.close();
        logger.error({ error });
        continue;
      }

      const resultMetrics = await metrics(result as IDirectCollectedData);
    
      console.log(resultMetrics);

      await browserService.close();
      logger.mark(`end for url: ${url}`);
    }
  
    await runner();
  };
  runner();
})();




