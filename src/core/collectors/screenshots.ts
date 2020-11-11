import { Page } from 'puppeteer';
import { logger } from '../../utils/logger';

import { resolve } from 'path';

export const takeScreenshots = async (page: Page, dir:string, name: string): Promise<string> => {
  const path = resolve(dir, `${name}.png`);
  logger.debug(`[collect] - take screenshot to ${path}`);
  await page.screenshot({
    fullPage: false,
    path,
  });

  return path;
};
