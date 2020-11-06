import { Page } from 'puppeteer';
import { logger } from '../../utils/logger';

import { resolve } from 'path';

export const takeScreenshots = async (page: Page, dir:string, name: string): Promise<void> => {
  const path = resolve(dir, `${name}.png`);
  logger.debug(`[collect] - take screenshot to ${path}`);
  await page.screenshot({
    fullPage: true,
    path,
  });
};
