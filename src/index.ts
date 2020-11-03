import { metrics } from './core';
import { sleep } from './helpers';

(async () => {
  await metrics(sleep(1000), 100);
})();