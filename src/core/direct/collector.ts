import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as fs from 'fs';

import { IDirectCollectedData, IDirectOptions } from '../../types';
import { logger } from '../../utils/logger';
import { sleep } from '../../helpers/index';
import { takeScreenshots } from '../../scripts/collectors/screenshots';
import { startElapsedTime, stopElapsedTime } from '../../scripts/collectors/elapsed-time';
import { startWindowMetrics, stopWindowMetrics, showWindowMetrics } from '../../scripts/collectors/window-metrics';
import { startNetworkEvents, stopNetworkEvents } from '../../scripts/collectors/network';
import { startTracing, stopTracing } from '../../scripts/collectors/tracing';
import { pageMetrics } from '../../scripts/collectors/page-metrics';
import { startCollectPageEvents, stopCollectPageEvents } from '../../scripts/collectors/page-events';
import { getConent } from '../../scripts/collectors/content';



export const collector = async (browser: puppeteer.Browser, options: IDirectOptions): 
Promise<IDirectCollectedData|null> => {
  logger.info(`start direct for url: ${options.url}`);

  // context is a mutable object
  const screenshots = {};
  const context: IDirectCollectedData = {} as IDirectCollectedData;
  const outputPath = options.tmpDir;
  if (!fs.existsSync(outputPath)){ fs.mkdirSync(outputPath, { recursive: true });}
  const rawDir =  options.saveRaw ? path.resolve(outputPath, 'raw') : null;
  if (rawDir && !fs.existsSync(rawDir)){ fs.mkdirSync(rawDir, { recursive: true });}

  logger.info(`init collectors: ${options.url}`);
  startElapsedTime(context);
  
  const page: puppeteer.Page = (await browser.pages())[0];

  const client = await page.target().createCDPSession();
  await client.send('Page.enable');
  await client.send('Network.enable');

  logger.info('page newtwork enable');

  if (options.extraHeaders) {
    page.setExtraHTTPHeaders(options.extraHeaders);
  }

  if (options.disableJavascript) {
    logger.mark('Disable JavaScript');
    await page.setJavaScriptEnabled(false);
  }

  if (options.clearCache) {
    logger.mark('client clear cookies and cache');
    await client.send('Network.clearBrowserCookies');
    await client.send('Network.clearBrowserCache');
  }

  await client.send('Page.enable');
  await client.send('Network.enable');

  // Inject web-vitals metrics
  await startWindowMetrics(page);
  await startNetworkEvents(page, context);
  await startCollectPageEvents(page, context);
  await pageMetrics(page, context, 'before');
  await startTracing(page);

  // Main enter in page
  await page.goto(options.url);
  await sleep(2500); // Most animations take place after 3 seconds, but other metrics place after 5 seconds

  await stopTracing(page, context, rawDir ? path.resolve(rawDir, 'tracing.json'): null);
  screenshots['screenshot'] = await takeScreenshots(page, outputPath, 'screenshot');
  await pageMetrics(page, context, 'after');

  await stopWindowMetrics(page, context, rawDir ? path.resolve(rawDir, 'windowMetrics.json'): null); // attention for this collector
  await getConent(page, context, rawDir ? path.resolve(rawDir, 'conent.html'): null);
  await stopNetworkEvents(page, context, rawDir ? path.resolve(rawDir, 'networkEvents.json'): null);

  await stopCollectPageEvents(page, context, rawDir ? path.resolve(rawDir, 'pageEvents.json'): null);

  stopElapsedTime(context);
  // console.log(context);
  logger.info(`stop direct for url: ${options.url}`);

  // Disable animation
  await client.send('Animation.disable');
  await client.send('Animation.setPlaybackRate', { playbackRate: 0 });

  await showWindowMetrics(page);

  return {
    options,
    outputPath,
    screenshots,
    ...context,
  };
};