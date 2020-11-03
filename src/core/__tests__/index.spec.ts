import { sleep } from '../../helpers';
import { speedpage } from '../';

describe('metrics', () => {
  it('timeout', () => {
    const action = async () => {
      await await speedpage(sleep(1000), 100);
    };
    expect(action()).rejects.toThrow();
  });

  it('no timeout', () => {
    const action = async () => {
      await await speedpage(sleep(1000), 100);
    };
    expect(action()).resolves.toThrow();
  });
});