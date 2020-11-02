import { sleep } from '../../helpers';
import { metrics } from '../';

describe('metrics', () => {
  it('timeout', async () => {
    const time = 1000;
    try {
      await metrics(sleep(time), time/2);
      
    } catch (error) {
      console.log(error);
      expect(error).toMatch('error');
    }
  });
});