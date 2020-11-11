/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const metrics = async (data: any) : Promise<any> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const metrics: Array<any> = [];
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const reportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
  const json = reportGenerator.generateReport(data, 'json');
  const report = JSON.parse(json); 
  const audits = report.audits;
  const categories = data.categories || {};

  metrics.push({
    name: 'seo',
    group: 'score',
    values: categories['seo'] ? categories['seo'].score : null,
  });

  metrics.push({
    name: 'best-practices',
    group: 'score',
    values: categories['best-practices'] ? categories['best-practices'].score : null,
  });

  metrics.push({
    name: 'accessibility',
    group: 'score',
    values: categories['accessibility'] ? categories['accessibility'].score : null,
  });

  metrics.push({
    name: 'performance',
    group: 'score',
    values: categories['performance'] ? categories['performance'].score : null,
  });

  metrics.push({
    name: 'cls',
    group: 'browser',
    values: audits['cumulative-layout-shift'] ? audits['cumulative-layout-shift'].numericValue : null,
  });

  metrics.push({
    name: 'fcp',
    group: 'browser',
    values: audits['first-contentful-paint'] ? audits['first-contentful-paint'].numericValue : null,
  });

  metrics.push({
    name: 'fcp',
    group: 'browser',
    values: audits['first-contentful-paint'] ? audits['first-contentful-paint'].numericValue : null,
  });

  metrics.push({
    name: 'lcp',
    group: 'browser',
    values: audits['largest-contentful-paint'] ? audits['largest-contentful-paint'].numericValue : null,
  });

  metrics.push({
    name: 'fmp',
    group: 'browser',
    values: audits['first-meaningful-paint'] ? audits['first-meaningful-paint'].numericValue : null,
  });

  metrics.push({
    name: 'totalBlockingTime',
    group: 'browser',
    values:  audits['total-blocking-time'] ? audits['total-blocking-time'].numericValue : null,
  });

  metrics.push({
    name: 'maxPotentialFid',
    group: 'browser',
    values: audits['max-potential-fid'] ? audits['max-potential-fid'].numericValue : null,
  });

  metrics.push({
    name: 'rt',
    group: 'browser',
    values: audits['server-response-time'] ? audits['server-response-time'].numericValue : null,
  });

  metrics.push({
    name: 'tti',
    group: 'browser',
    values: audits['time-to-interactive'] ? audits['time-to-interactive'].numericValue : null,
  });

  metrics.push({
    name: 'speedIndex',
    group: 'visual',
    values: audits['speed-index'] ? audits['speed-index'].numericValue : null,
  });

  // Check persistends data before return;

  return metrics;
};



