import { metrics } from './core';
import { sleep } from './core/helpers';

(async () => {
  await metrics(sleep(1000), 10000);
})();