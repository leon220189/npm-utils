import { CommonUtils } from '../utils/common';

const utils = new CommonUtils();
describe('CommonUtils', () => {
  describe('getProp', () => {
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

    it('Should return undefined', async () => {
      const result: any = utils.getProp(object, 'attrFour', undefined);
      expect(result).toStrictEqual(undefined);
    });

    it('Should return {}', async () => {
      const result: any = utils.getProp(object, 'attrFour', {});
      expect(result).toStrictEqual({});
    });

    it('Should return "A"', async () => {
      const result: any = utils.getProp(object, 'attrFive.A', {});
      expect(result).toStrictEqual('A');
    });

    it('Should return null', async () => {
      const result: any = utils.getProp(object, 'attrFive.C', null);
      expect(result).toStrictEqual(null);
    });
  });

  describe('generateUUId', () => {
    it('Should return property of object', async () => {
      const result: any = utils.generateUUId();
      expect(result).toBeDefined();
    });
  });

  describe('convertToCurrency', () => {
    it('Should return string "$100.00"', async () => {
      const result: any = utils.convertToCurrency(100);
      expect(result).toStrictEqual('$100.00');
    });

    it('Should return string "$0.10"', async () => {
      const result: any = utils.convertToCurrency(0.1);
      expect(result).toStrictEqual('$0.10');
    });

    it('Should return string "€ 100,00"', async () => {
      const result: any = utils.convertToCurrency(100, 'EUR', 'nl-NL');
      expect(result).toHaveLength(8);
    });

    it('Should return Error', async () => {
      expect(() => utils.convertToCurrency(100, 'EURo', 'nl-NL')).toThrow(
        Error,
      );
    });
  });

  describe('removeDuplicates', () => {
    it('Should return array [1,"1",2,3,4]', async () => {
      const array: any = [1,'1',1,2,3,4];
      const result: any = utils.removeDuplicates(array);
      expect(result).toStrictEqual([1,'1',2,3,4]);
    });

    it('Should return array ["1",1,2,3,4]', async () => {
      const array: any = ['1',1,1,2,3,4];
      const result: any = utils.removeDuplicates(array);
      expect(result).toStrictEqual(['1',1,2,3,4]);
    });

    it('Should return array ["1",1,2,3,4]', async () => {
      const array: any = ['1','1',1,2,3,4];
      const result: any = utils.removeDuplicates(array);
      expect(result).toStrictEqual(['1',1,2,3,4]);
    });

    it('Should return array [null, undefined, {}]', async () => {
      const array: any = [null, null, undefined, undefined, {}];
      const result: any = utils.removeDuplicates(array);
      expect(result).toStrictEqual([null, undefined, {}]);
    });

    it('Should return array [null, undefined, {}, {}]', async () => {
      const array: any = [null, null, undefined, {}, {}];
      const result: any = utils.removeDuplicates(array);
      expect(result).toStrictEqual([null, undefined, {}, {}]);
    });

    it('Should return array [null, undefined, {}, {}]', async () => {
      const array: any = [null, null, undefined, {a:'a'}, {a:'a'}];
      const result: any = utils.removeDuplicates(array);
      expect(result).toStrictEqual([null, undefined, {a:'a'}, {a:'a'}]);
    });
  });
});
