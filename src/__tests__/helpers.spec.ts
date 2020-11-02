import { sleep } from '../helpers';

describe('helpers', () => {
  it('sleep', async () => {
    const ms = 1000;
    const timeStart = Number(new Date());
    await sleep(ms);
    const endTime = Number(new Date());
    expect(endTime - timeStart >= ms).toBe(true);
  });
});