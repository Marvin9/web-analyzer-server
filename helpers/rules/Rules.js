const { keyExists } = require('../utils');

class Rules {
  constructor() {
    this.rulesBuffer = {};
    this.enterBuffer = [];
    this.exitBuffer = [];
  }

  setRule(tagName, obj) {
    if (
      typeof tagName !== 'string'
      || tagName === null
      || tagName === ''
      || typeof obj !== 'object'
      || !keyExists(obj, 'ruleName')
      || typeof obj.ruleName !== 'string'
      || !keyExists(obj, 'fn')
      || typeof obj.fn !== 'function'
    ) {
      return false;
    }

    if (keyExists(this.rulesBuffer, tagName)) {
      this.rulesBuffer[tagName] = {
        ...this.rulesBuffer[tagName],
        [obj.ruleName]: obj.fn,
      };
    } else {
      this.rulesBuffer[tagName] = {
        [obj.ruleName]: obj.fn,
      };
    }
    return true;
  }

  getRule(tagName, ruleName) {
    if (
      keyExists(this.rulesBuffer, tagName)
      && keyExists(this.rulesBuffer[tagName], ruleName)
    ) return this.rulesBuffer[tagName][ruleName];
    return 0;
  }

  getRulesByTagName(tagName) {
    if (keyExists(this.rulesBuffer, tagName)) return this.rulesBuffer[tagName];
    return {};
  }
}

module.exports = Rules;
