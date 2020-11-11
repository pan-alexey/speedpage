import { Page } from 'puppeteer';
import { ICollectData } from '../../core/types';
import { logger } from '../../utils/logger';
import * as fs from 'fs';
import * as SafeJsonStringify from 'safe-json-stringify';

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

export const startNetworkEvents = async (page: Page, context: ICollectData): Promise<void> => {
  logger.mark('[start collect] - page network events;');
  context.networkEvents = [];

  const client = await page.target().createCDPSession();
  networkEvents.forEach(method => {
    client.on(method, params => {
      context.networkEvents.push({ method, params });
    });
  });

  await client.send('Page.enable');
  await client.send('Network.enable');
};

export const stopNetworkEvents = async (page: Page, context: ICollectData, rawPath?:string): Promise<void> => {
  logger.mark('[stop collect] - page network events;');
  const client = await page.target().createCDPSession();
  const json = SafeJsonStringify( context.networkEvents );
  if (rawPath) {
    fs.writeFileSync(rawPath, json);
  }
  client.removeAllListeners();
};
