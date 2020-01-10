const debug = require('debug')('plugins');
const Rules = require('./Rules');
const plugins = require('./plugins');
const { keyExists } = require('../utils');

class RulesPlugin extends Rules {
  constructor() {
    super();
    for (let i = 0, iBound = plugins.length; i < iBound; i++) {
      const pluginName = plugins[i];
      const pluginPath = `./list/${pluginName}`;
      const plugin = require(pluginPath); // eslint-disable-line

      if (keyExists(plugin, 'init')) this.enterBuffer = [...this.enterBuffer, plugin.init];
      if (keyExists(plugin, 'end')) this.exitBuffer = [...this.exitBuffer, plugin.end];
      if (keyExists(plugin, 'plugin')
        && keyExists(plugin, 'ruleName')
        && keyExists(plugin, 'tag')
      ) {
        this.setRule(plugin.tag, {
          ruleName: plugin.ruleName,
          fn: plugin.plugin,
        });
      }
    }
    debug(this);
  }
}

module.exports = RulesPlugin;
