import * as puppeteer from 'puppeteer';

export interface ILighthouseOptions {
  url: string;
  platform?: string,
  tmpDir: string;
  alias?: string;
  userAgent?: string;
  clearCache?: boolean;
  clearCookies?: boolean;
  clearStorage?: boolean;
  extraHeaders?: {
    [key: string]: string
  },
  cookies?: Array<puppeteer.SetCookie>
}