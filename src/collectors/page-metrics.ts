import { Page } from 'puppeteer';
import { ICollectData } from '../types';

export default async (page: Page, context: ICollectData, key: string): Promise<void> => {
  context.metrics[key] = await page.metrics();
};
