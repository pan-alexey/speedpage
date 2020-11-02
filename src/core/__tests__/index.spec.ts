import { sleep } from '../../helpers';
import { metrics } from '../';

describe('metrics', () => {
  it('timeout', async () => {
    const time = 1000;
    await metrics(sleep(time), time/2);
    // try {
    //   await metrics(sleep(time), time/2);
    // } catch (e) {
    //   expect(e).toMatch('error');
    // }
  });
});