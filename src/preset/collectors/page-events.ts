import { Page } from 'puppeteer';
import { IDirectionsCollectedData } from '../direction';

export default async (page: Page, context: IDirectionsCollectedData): Promise<void> => {
    page.on('pageerror', ({ message }) => context.pageEvents.pageerror.push(message));
    page.on('requestfailed', request => context.pageEvents.requestfailed.push(request));
    page.on('response', response => context.pageEvents.response.push(response));
    page.on('console', (log)=>{
      console.log(log);
      context.pageEvents.console.push(log);
    });
};
