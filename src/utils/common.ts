import { randomUUID } from 'crypto';

export class CommonUtils {
  constructor() {}

  /**
   * Verifies if property exists and returns value.
   *
   * Usage: getProp({a: { b: { c: 1 }}, 'a.b.c') => 1
   *
   * @param {object} o
   * @param {string} props object path
   * @param {*} defaultValue value returned if property does not exist
   *
   * @returns the value o
   */
  getProp = (o: object, props: string, defaultValue: any) =>
    props
      ? props
          .split('.')
          .reduce(
            (a: any, b: any) =>
              a && typeof a[b] !== 'undefined' ? a[b] : defaultValue,
            o,
          )
      : defaultValue;

  /**
   * Generate the unique id
   * @returns {string} a unique id
   */
  generateUUId() {
    const currentTime: number = new Date().getTime();
    const randomString: any = randomUUID().split('-').pop();
    const uuid = randomString + currentTime;
    return uuid;
  }

  /**
   * Convert a Number to a Currency
   * @param {*} num — The number to format.
   * @param {*} currency - The currency to format to — The default is set to “USD”
   * @param {*} locale - The default is set to “en-US”
   * @returns {string} value after convert
   */
  convertToCurrency(num: number, currency = 'USD', locale = 'en-US') {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    });
    return formatter.format(num);
  }

  /**
   * Measure the Performance of a Function
   * @param {*} name — The name of the label is displayed in the console.
   * @param {*} fn - The function you want to measure the performance of
   * @param {*} args - The arguments for the function you’re calling
   * @returns {string} time fuction took to execute
   */
  measurePerformance(name: string, fn: Function, ...args: any) {
    if (typeof fn !== 'function') {
      console.error(`Provide a valid function, ${typeof fn} provided`);
      return;
    }
    console.time(name);
    fn.bind(this, ...args);
    console.timeEnd(name);
  }

  /**
   *  Remove Duplicates From an Array
   * @param {*} array — input array list.
   * @returns {array} new array after remove duplicates
   */
  removeDuplicates(array: []) {
    if (!Array.isArray(array)) {
      console.error(`array expected, ${typeof array} provided`);
      return;
    }

    return [...new Set(array)];
  }
}
