import { Page } from 'puppeteer';
import { ICollectData } from '../../types';
import * as fs from 'fs';
import * as SafeJsonStringify from 'safe-json-stringify';
import { logger } from '../../utils/logger';

export const startCollectPageEvents  = async (page: Page, context: ICollectData): Promise<void> => {
  logger.mark('[start collect] - page events');

  context.pageEvents = {
    pageerror: [],
    requestfailed: [],
    response: [],
    console: [],
  };
  page.on('pageerror', ({ message }) => context.pageEvents.pageerror.push(message));
  page.on('requestfailed', request => context.pageEvents.requestfailed.push(request)); // Request is a Node object Request
  page.on('response', response => context.pageEvents.response.push(response)); // Response is a Node object Response
  page.on('console', (log)=>{
    // console.log(log);
  });
};

export const stopCollectPageEvents  = async (page: Page, context: ICollectData, 
  rawPath?:string|null|false): Promise<void> => {
  logger.mark('[stop collect] - page events');

  if (rawPath) {
    // //TODO FIX THIS
    // const json = SafeJsonStringify(context.pageEvents);
    // fs.writeFileSync(json, rawPath);
  }
  page.removeAllListeners();
};
