import { Page, NavigationOptions, devices, Response } from 'puppeteer';

export class PageDecorator {
  private _page: Page;

  constructor(page: Page) {
    this._page = page;
    return this;
  }

  public open = async (url: string): Promise<void> => {
    await this._page.goto(url, { waitUntil: 'domcontentloaded' });

    // await this._page.evaluate(() => {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve();
    //     }, 60*2*10000);
    //     if (document.readyState === 'complete') {
    //       resolve('ok');
    //     }
    //     document.onreadystatechange = () => {
    //       if (document.readyState === 'complete') {
    //         resolve('ok');
    //       }
    //     };
    //   });
    // });
  };
}
