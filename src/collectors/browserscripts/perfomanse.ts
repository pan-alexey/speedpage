/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
// @ts-nocheck

module.exports = () => {
  window['$$perfomanse'] = {};

  window['$$perfomanse'].context = {};

  console.log('Web vitals inject to tab');

  // [FID] - First Input Delay (https://web.dev/fid/)
  (function (context) {
    context.FID = {};
    context.FID.value = 0;
    context.FID.entries = [];
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        context.FID.value = entry.processingStart - entry.startTime;
        context.FID.entries.push(entry);
      }
    });
    observer.observe({ type: 'first-input', buffered: true });
    document.addEventListener('load', () => {
      observer.disconnect();
    });
  })(window['$$perfomanse'].context);

  // [CLS] - Cumulative Layout Shift (https://web.dev/cls/)
  (function (context) {
    context.CLS = {};
    context.CLS.value = 0;
    context.CLS.entries = [];
    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (!entry['hadRecentInput']) {
          context.CLS.value += entry['value'];
        }
        context.CLS.entries.push(entry);
      }
    });
    observer.observe({ type: 'layout-shift', buffered: true });
    document.addEventListener('visibilitychange', () => {
      observer.disconnect();
    });
  })(window['$$perfomanse'].context);

  // [LCP] - Largest Contentful Paint (https://web.dev/lcp/)
  (function (context) {
    context.LCP = {};
    context.LCP.value = 0;
    context.LCP.entries = [];
    const observer = new PerformanceObserver(entryList => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        context.LCP.value = lastEntry['renderTime'] || lastEntry['loadTime'];
        context.LCP.entries = [...context.LCP.entries, ...entries];
    });
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
    document.addEventListener('visibilitychange', function () {
        observer.disconnect();
    });
  })(window['$$perfomanse'].context);

  // [LT] - Long Tasks (https://developer.mozilla.org/en-US/docs/Web/API/Long_Tasks_API)
  (function (context) {
    context.LT = [];
    const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          context.LT.push(entry);
        }
    });
    observer.observe({ type: 'longtask', buffered: true });
    document.addEventListener('visibilitychange', function () {
        observer.disconnect();
    });
  })(window['$$perfomanse'].context);


  // // Function for serialize PerformanceObserver data;
  // // $$perfomanse.serialize($$perfomanse.context)
  // const serialize = (obj: any) => {
  //   if (obj === null || typeof (obj) != 'object') {
  //     return obj;
  //   }
  //   const temp: any = {};

  //   // if (obj instanceof Element) {
  //   //   return obj.innerHTML
  //   // }

  //   if (obj instanceof LayoutShift) {
  //     for (const key in obj.sources) {
  //       temp[key] = {};
  //       temp[key].value = obj.sources[key].value;
  //       temp[key].node = obj.sources[key].node ? obj.sources[key].node.innerHTML : obj.sources[key].node;
  //       temp[key].currentRect = obj.sources[key].currentRect;
  //       temp[key].previousRect = obj.sources[key].previousRect;
  //     }
  //     return temp;
  //   }

  //   if (obj instanceof PerformanceLongTaskTiming) {
  //     for (const key in obj) {
  //       temp[key] = {};
  //       temp[key].duration = obj.duration;
  //       temp[key].entryType = obj.entryType;
  //       temp[key].name = obj.name;
  //       temp[key].startTime = obj.startTime;
  //       temp[key].attribution = Array.prototype.slice.call(obj.attribution);
  //     }
  //     return temp;
  //   }

  //   for (const key in obj) {
  //     temp[key] = serialize(obj[key]);
  //   }
  //   return temp;
  // };

  // window['$$perfomanse'].serialize = serialize;
  //window['$$perfomanse']['getPerfomance'] = () => JSON.stringify(serialize(window['$$perfomanse'].context));
};
