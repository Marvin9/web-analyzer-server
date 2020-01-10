const { keyExists } = require('../utils');

class Rules {
  constructor() {
    this.rulesBuffer = {};
    this.enterBuffer = [];
    this.exitBuffer = [];
  }

  setRule(tagName, obj) {
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
  }

  getRule(tagName, ruleName) {
    if (
      keyExists(this.rulesBuffer, tagName)
      && keyExists(this.rulesBuffer[tagName], ruleName)
    ) return this.rulesBuffer[tagName][ruleName];
    return {};
  }

  getRulesByTagName(tagName) {
    if (keyExists(this.rulesBuffer, tagName)) return this.rulesBuffer[tagName];
    return 0;
  }
}

module.exports = Rules;
