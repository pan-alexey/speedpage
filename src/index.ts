import { awaitTimeout } from './helpers';
import { Browser } from './service/browser';
import { logger } from './utils/logger';
import { direct } from './core/direct';

const browserService = new Browser();
const runner = async () => {
  const urls = [
    'https://www.ozon.ru',
  ];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    logger.mark(`start for url: ${url}`);
    const browser = await browserService.create(['--enable-thread-instruction-count']);
    const collector = direct(browser, {
      url
    });

    const { result, error } = await awaitTimeout(collector, 140000);

    if (error) {
      await browserService.restart();
      logger.error({ error })
      return;
    }

    await browserService.close();
    logger.mark(`end for url: ${url}`);
  }

  await runner();
}
runner();
