import { Metrics, speedpage } from './core';
import { sleep } from './helpers';

import { Directions } from './preset/direction';


(async () => {

  const metric = new Metrics({
    url: 'https://www.ozon.tu',
  });

  await speedpage(metric, 100);
})();