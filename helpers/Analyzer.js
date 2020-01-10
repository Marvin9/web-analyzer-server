const utils = require('./utils');
const RulesPlugin = require('./rules/RulesPlugin');

class Analyzer extends RulesPlugin {
  constructor(tree = {}) {
    super();
    this.tree = tree;
    this.level = 0;
    this.locals = {};
    this.report = [];
  }

  reporter() {
    this.enterBuffer.forEach((buffer) => {
      buffer(this);
    });
    this.iterator();
    this.exitBuffer.forEach((buffer) => {
      buffer(this);
    });
  }

  iterator(tree = this.tree, level = this.level) {
    if (tree && utils.keyExists(tree, 'childNodes')) {
      for (let i = 0, iBound = tree.childNodes.length; i < iBound; i++) {
        this.iterator(tree.childNodes[i], level + 1);
      }
    }
  }
}

module.exports = Analyzer;
