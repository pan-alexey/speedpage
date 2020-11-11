
import { ELogLevel } from './utils/logger';

export const logLevel = Number(process.env.LOG_LEVEL) || ELogLevel.debug;

export const directConfig = (platform?: string) => {
  const desktop = {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
    viewport: {
      width: 1920,
      height: 1080,
    },
  };

  const mobile = {
    userAgent: 'Mozilla/5.0 (Linux; Android 8.1.0; DUB-LX3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.105 Mobile Safari/537.36',
    viewport: {
      width: 360,
      height: 640,
    },
  };

  return platform === 'desktop' ? desktop : mobile;
};

export const lighthouseConfig = (emulatedFormFactor?: string) => {
  return {
      extends: 'lighthouse:default',
      settings: {
        maxWaitForFcp: 60 * 1000,
        maxWaitForLoad: 5 * 60 * 1000,
        emulatedFormFactor,
        // throttling: {
        //   rttMs: 40,
        //   throughputKbps: 10240,
        //   cpuSlowdownMultiplier: 1,
        //   requestLatencyMs: 0,
        //   downloadThroughputKbps: 0,
        //   uploadThroughputKbps: 0
        // }
      },
    };
};
