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
    expect(utils.keyExists(obj, 'anotherKey')).toBeTruthy();
  });
});

const checkForSameInputAndOutput = (inputs) => {
  inputs.forEach((input) => {
    expect(utils.sanitizeUrl(input)).toBe(input);
  });
};

describe('sanitizeUrl', () => {
  const standardGithubURL = 'https://www.github.com';
  const standardGithubURLWithPath = 'https://www.github.com/Marvin9';
  const standardGithubURLWithQuery = 'https://www.github.com/Marvin9?tab=repositories';

  it('should return empty string if url is invalid', () => {
    expect(utils.sanitizeUrl('invalidurl')).toBe('');
  });

  it('should return correct string for url containing -> protocol + subdomain + domain', () => {

    checkForSameInputAndOutput([standardGithubURL, standardGithubURLWithPath, standardGithubURLWithQuery]);
  });

  it('should return correct string (with subdomain as "www") for url containing -> protocol + domain', () => {
    const url = 'https://github.com';
    const urlWithPath = 'https://github.com/Marvin9';
    const urlWithQuery = 'https://github.com/Marvin9?tab=repositories';

    expect(utils.sanitizeUrl(url)).toBe(standardGithubURL);
    expect(utils.sanitizeUrl(urlWithPath)).toBe(standardGithubURLWithPath);
    expect(utils.sanitizeUrl(urlWithQuery)).toBe(standardGithubURLWithQuery);
  });

  it('should return correct string (with protocol as "https") for url containing -> subdomain + domain', () => {
    const url = 'www.github.com';
    const url2 = 'www.google.com';

    expect(utils.sanitizeUrl(url)).toBe(standardGithubURL);
  });

  it('should return correct string (with protocol as "https" & subdomain as "www") for url containing -> domain', () => {
    const url = 'github.com';

    expect(utils.sanitizeUrl(url)).toBe(standardGithubURL);
  });
});
