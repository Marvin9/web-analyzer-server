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

  reporter(tree = this.tree) {
    this.enterBuffer.forEach((buffer) => {
      buffer(this);
    });
    this.iterator(tree);
    this.exitBuffer.forEach((buffer) => {
      buffer(this);
    });
  }

  iterator(tree = this.tree, level = this.level) {
    if (tree && utils.keyExists(tree, 'childNodes')) {
      const tag = tree.nodeName;
      const rulesByTag = this.getRulesByTagName(tag);
      Object.keys(rulesByTag).forEach((rule) => {
        rulesByTag[rule](tree, this);
      });
      for (let i = 0, iBound = tree.childNodes.length; i < iBound; i++) {
        this.iterator(tree.childNodes[i], level + 1);
      }
    }
  }
}

module.exports = Analyzer;
