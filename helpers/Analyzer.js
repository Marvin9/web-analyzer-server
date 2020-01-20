const utils = require('./utils');
const RulesPlugin = require('./rules/RulesPlugin');
const robotsTxt = require('./rules/list/robots-txt');

class Analyzer extends RulesPlugin {
  constructor(tree = {}) {
    super();
    this.tree = tree;
    this.level = 0;
    this.locals = {};
    this.report = [];
  }

  reporter(tree = this.tree, url, cb) {
    this.url = url;
    robotsTxt.plugin(null, this)
      .then(() => {
        this.enterBuffer.forEach((buffer) => {
          buffer(this);
        });
        this.iterator(tree);
        this.exitBuffer.forEach((buffer) => {
          buffer(this);
        });
        cb(this.report);
      });
  }

  iterator(tree = this.tree, level = this.level) {
    if (tree && utils.keyExists(tree, 'childNodes')) {
      const tag = tree.nodeName;
      const rulesByTag = this.getRulesByTagName(tag);

      Object.keys(rulesByTag).forEach((rule) => {
        const fn = this.getRule(tag, rule);

        if (fn !== 0) fn(tree, this);
      });

      for (let i = 0, iBound = tree.childNodes.length; i < iBound; i++) {
        this.iterator(tree.childNodes[i], level + 1);
      }
    }
  }
}

module.exports = Analyzer;
