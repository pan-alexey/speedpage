import { Page } from 'puppeteer';
import { ICollectData } from '../../core/types';
import { logger } from '../../utils/logger';
import * as fs from 'fs';

export const getConent = async (page: Page, context: ICollectData, rawPath?:string|null|false): Promise<void> => {
  logger.mark('[collect] - page content');
  const content = await page.content();
  context.content = content;

  if (rawPath) {
    fs.writeFileSync(rawPath, content);
  }
};