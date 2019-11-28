const {
  humanArrayToString,
} = require('./string');

describe('Unity tests of utils', () => {
  test('humanArrayToString transforms arrays on comma and space string', () => {
    expect(humanArrayToString(['hello', 'world'])).toBe(' hello, world');
  });

  test('humanArrayToString throws TypeError if param is not an Array', () => {
    try {
      humanArrayToString({ not: 'an array' });
      throw new Error('TypeError expected');
    } catch (e) {
      expect(e.message).toBe('array parameter must be of type Array');
      expect(e.name).toBe('TypeError');
    }
  });
});