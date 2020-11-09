import { Page } from 'puppeteer';
import { ICollectData } from '../../types';
import { logger } from '../../utils/logger';
import * as fs from 'fs';
import * as SafeJsonStringify from 'safe-json-stringify';

export const startCoverage = async (page: Page, context: ICollectData): Promise<void> => {
  logger.mark('[start collect] - start js/css converage;');
  await Promise.all([
    page.coverage.startJSCoverage(),
    page.coverage.startCSSCoverage(),
  ]);
};

export const stopCoverage = async (page: Page, context: ICollectData, rawPath?:string): Promise<void> => {
  logger.mark('[stop collect] - start js/css converage;');
  const [jsCoverage, cssCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage(),
  ]);

  context.coverage = {
    js: jsCoverage,
    css: cssCoverage,
  };

  if (rawPath) {
    const json = SafeJsonStringify(context.coverage);
    fs.writeFileSync(rawPath, json);
  }
};
