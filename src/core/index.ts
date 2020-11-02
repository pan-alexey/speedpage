import * as puppeteer from 'puppeteer';

export const Metrics = async (): Promise<void> => {
  const browser = await puppeteer.launch({
    // headless: true,
    defaultViewport: null,
    devtools: true,
    args: [
      '--hide-scrollbars',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--enable-thread-instruction-count',
    ],
  });

  const timer = setTimeout(async ()=> {
    console.log('timeout');
    await browser.close();
  }, 30000);


  await browser.close();
  clearTimeout(timer);
};