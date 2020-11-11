import { IDirectCollectedData } from './types';
import { visualMetrics } from '../../core/metrics/visual-metrics';
import { fidBrowserApi } from '../../core/metrics/fid';
import { clsBrowserApi } from '../../core/metrics/cls';
import { lcpBrowserApi } from '../../core/metrics/lcp';
import { dnsTimeBrowserApi } from '../../core/metrics/dns-time';
import { sslTimeBrowserApi } from '../../core/metrics/ssl-time';
import { tcpTimeBrowserApi } from '../../core/metrics/tcp-time';
import { ttfbBrowserApi } from '../../core/metrics/ttfb';
import { ttlbBrowserApi } from '../../core/metrics/ttlb';
import { redirectCountBrowserApi, redirectTimeBrowserApi } from '../../core/metrics/redirect';
import { fcp } from '../../core/metrics/paint';

export const metrics = async (data: IDirectCollectedData) : Promise<unknown> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const metrics: Array<any> = [];

  // visual metrics
  const visual =  await visualMetrics(data.tracing);
  metrics.push({
    name: 'firstVisualChange',
    group: 'visual',
    values: visual.firstVisualChange,
  });

  metrics.push({
    name: 'lastVisualChange',
    group: 'visual',
    values: visual.lastVisualChange,
  });

  metrics.push({
    name: 'speedIndex',
    group: 'visual',
    values: visual.speedIndex,
  });

  metrics.push({
    name: 'visualComplete85',
    group: 'visual',
    values: visual.visualComplete85,
  });

  // rum metrics
  metrics.push({
    name: 'fid',
    group: 'rum',
    values: fidBrowserApi(data.browserPerformanceApi.perfomanceObserver),
  });

  metrics.push({
    name: 'cls',
    group: 'rum',
    values: clsBrowserApi(data.browserPerformanceApi.perfomanceObserver),
  });

  metrics.push({
    name: 'lcp',
    group: 'rum',
    values: lcpBrowserApi(data.browserPerformanceApi.perfomanceObserver),
  });

  metrics.push({
    name: 'dnsTime',
    group: 'browser',
    values: dnsTimeBrowserApi(data.browserPerformanceApi.performance),
  });

  metrics.push({
    name: 'sslTime',
    group: 'browser',
    values: sslTimeBrowserApi(data.browserPerformanceApi.performance),
  });

  metrics.push({
    name: 'tcpTime',
    group: 'browser',
    values: tcpTimeBrowserApi(data.browserPerformanceApi.performance),
  });

  metrics.push({
    name: 'ttfb',
    group: 'browser',
    values: ttfbBrowserApi(data.browserPerformanceApi.performance),
  });

  metrics.push({
    name: 'ttlb',
    group: 'browser',
    values: ttlbBrowserApi(data.browserPerformanceApi.performance),
  });

  metrics.push({
    name: 'redirectTime',
    group: 'browser',
    values: redirectTimeBrowserApi(data.browserPerformanceApi.performance),
  });

  metrics.push({
    name: 'redirectCount',
    group: 'browser',
    values: redirectCountBrowserApi(data.browserPerformanceApi.performance),
  });

  metrics.push({
    name: 'fcp',
    group: 'browser',
    values: fcp(data.browserPerformanceApi.entries),
  });
  // Check persistends data before return;
  return metrics;
};



