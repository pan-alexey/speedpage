import { sleep, uniq } from '../helpers';

describe('helpers', () => {
  it('sleep', async () => {
    const ms = 1000;
    const timeStart = Number(new Date());
    await sleep(ms);
    const endTime = Number(new Date());
    expect(endTime - timeStart >= ms).toBe(true);
  });

  it('uniq', async () => {
    expect(expect.stringContaining(uniq()))
      .not.toEqual(expect.stringContaining(uniq()));
  });

});