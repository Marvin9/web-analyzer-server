const utils = require('../helpers/utils');

describe('keyExists', () => {
  const obj = {
    key: 'value',
    anotherKey: 'another value',
  };

  it('should return false if key don\'t exist in object', () => {
    expect(utils.keyExists(obj, 'notExistedKey')).toBeFalsy();
  });

  it('should return true if key exist in object', () => {
    expect(utils.keyExists(obj, 'key')).toBeTruthy();
    expect(utils.keyExists(obj, 'key')).toBeTruthy();
  });
});
