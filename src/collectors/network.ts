import { Page } from 'puppeteer';
import { ICollectData } from '../types';
import { logger } from '../utils/logger';

const networkEvents = [
  'Page.loadEventFired',
  'Page.domContentEventFired',
  'Page.frameStartedLoading',
  'Page.frameAttached',
  'Network.requestWillBeSent',
  'Network.requestServedFromCache',
  'Network.dataReceived',
  'Network.responseReceived',
  'Network.resourceChangedPriority',
  'Network.loadingFinished',
  'Network.loadingFailed',
];

export default async (page: Page, context: ICollectData): Promise<void> => {
  logger.debug('[collect] - start page network events;');
  const client = await page.target().createCDPSession();

  networkEvents.forEach(method => {
    client.on(method, params => {
      context.networkEvents.push({ method, params });
    });
  });

  await client.send('Page.enable');
  await client.send('Network.enable');
};
