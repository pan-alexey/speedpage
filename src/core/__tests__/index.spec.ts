import { sleep } from '../../helpers';
import { metrics } from '../';

describe('metrics', () => {
  it('timeout', () => {
    const action = async () => {
      await await metrics(sleep(1000), 100);
    };
    expect(action()).rejects.toThrow();
  });

  it('no timeout', () => {
    const action = async () => {
      await await metrics(sleep(1000), 100);
    };
    expect(action()).resolves.not.toThrow();
  });
});