import { Page } from 'puppeteer';
import { ICollectData } from '../../types';

export const startCollectPageEvents  = async (page: Page, context: ICollectData): Promise<void> => {
    page.on('pageerror', ({ message }) => context.pageEvents.pageerror.push(message));
    page.on('requestfailed', request => context.pageEvents.requestfailed.push(request)); // Request is a Node object Request
    // page.on('response', response => context.pageEvents.response.push(response)); // Response is a Node object Response
    page.on('console', (log)=>{
      console.log(log);
      // context.pageEvents.console.push(log);
    });
};

export const stopCollectPageEvents  = async (page: Page, context: ICollectData): Promise<void> => {
  page.removeAllListeners();
};
