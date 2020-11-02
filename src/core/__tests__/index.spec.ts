const puppeteer = require('puppeteer');
import { sleep } from '../helpers';
import { metrics } from '../';

describe('metrics', () => {
  it('timeout', async () => {
    const time = 1000;
    expect(
      await metrics(sleep(time), time/2)
    ).toThrow();
  });
});