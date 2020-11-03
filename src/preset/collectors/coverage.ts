import { Page } from 'puppeteer';

import { IDirectionsCollectedData } from '../direction';
import { logger } from '../../utils/logger';

interface ICollectCoverage {
  startCoverage: () => Promise<void>;
  stopCoverage: () => Promise<void>;
}

export default async (page: Page, context: IDirectionsCollectedData): Promise<ICollectCoverage> => {
  const startCoverage = async () => {
    logger.debug('[collect] - start page coverage');
    await Promise.all([
      page.coverage.startJSCoverage(),
      page.coverage.startCSSCoverage(),
    ]);
  };

  const stopCoverage = async () => {
    logger.debug('[collect] - end page coverage');
    const [jsCoverage, cssCoverage] = await Promise.all([
      page.coverage.stopJSCoverage(),
      page.coverage.stopCSSCoverage(),
    ]);

    context.coverage.js = jsCoverage;
    context.coverage.css = cssCoverage;
  };

  return {
    startCoverage,
    stopCoverage,
  };
};
