import { Page } from 'puppeteer';
import { IDirectionsCollectedData } from '../direction';

export default async (page: Page, context: IDirectionsCollectedData, key: string): Promise<void> => {
  context.metrics[key] = await page.metrics();
};
