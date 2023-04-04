# UTILS-REUSE

## Project information

- Name: Utils
- Version: 1

## Setting up local environment

```bash

```

## Running the app

```bash
# development
# start dev env
$ npm run dev
```

## Test

```bash
# unit tests
$ npm run test
```

### Quick Guide

#### Common Function

```js
import { CommonUtils } from '@utils/abc';

const utils = new CommonUtils();

// getProp -  Verifies if property exists and returns value.
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
const object = {
  attrOne: '1',
  attrTwo: 2,
  attrThree: '3',
  attrFive: {
    A: 'A',
    B: 'B',
  },
};

it('Should return property of object', async () => {
  const result: any = utils.getProp(object, 'attrTwo', '');
  expect(result).toStrictEqual(object.attrTwo);
});

// generateUUId - Generate the unique id
/**
 * Generate the unique id
 * @returns {string} a unique id
 */
it('Should return property of object', async () => {
  const result: any = utils.generateUUId();
  expect(result).toBeDefined();
});

// convertToCurrency - Convert a Number to a Currency
/**
 * Convert a Number to a Currency
 * @param {*} num — The number to format.
 * @param {*} currency - The currency to format to — The default is set to “USD”
 * @param {*} locale - The default is set to “en-US”
 * @returns {string} value after convert
 */
it('Should return string "€ 100,00"', async () => {
  const result: any = utils.convertToCurrency(100, 'EUR', 'nl-NL');
  expect(result).toHaveLength(8);
});

// refer link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat

// measurePerformance - Measure the Performance of a Function
/**
 * Measure the Performance of a Function
 * @param {*} name — The name of the label is displayed in the console.
 * @param {*} fn - The function you want to measure the performance of
 * @param {*} args - The arguments for the function you’re calling
 * @returns {string} time fuction took to execute
 */
it('Should return property of object', async () => {
  const result: any = utils.measurePerformance();
  expect(result).toBeDefined();
});

// removeDuplicates -Remove Duplicates From an Array except object
/**
 *  Remove Duplicates From an Array
 * @param {*} array — input array list.
 * @returns {array} new array after remove duplicates
 */
it('Should return array [1,"1",2,3,4]', async () => {
  const array: any = [1, '1', 1, 2, 3, 4];
  const result: any = utils.removeDuplicates(array);
  expect(result).toStrictEqual([1, '1', 2, 3, 4]);
});
```

#### Logger updating

Alternatively, you can use return promises instead of using the `done` callback:

```javascript
videoQueue.process(function (job) {
  // don't forget to remove the done callback!
  // Simply return a promise
  return fetchVideo(job.data.url).then(transcodeVideo);

  // Handles promise rejection
  return Promise.reject(new Error('error transcoding'));

  // Passes the value the promise is resolved with to the "completed" event
  return Promise.resolve({ framerate: 29.5 /* etc... */ });

  // If the job throws an unhandled exception it is also handled correctly
  throw new Error('some unexpected error');
  // same as
  return Promise.reject(new Error('some unexpected error'));
});
```

```

---

- Author - [Binh Le]

## License

[MIT licensed](LICENSE).
