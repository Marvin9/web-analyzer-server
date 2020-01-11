const { keyExists } = require('../helpers/utils');

module.exports = (plugin) => (
  !keyExists(plugin, 'ruleName')
  || !keyExists(plugin, 'desc')
  || !keyExists(plugin, 'example')
  || typeof plugin.ruleName !== 'string'
  || typeof plugin.desc !== 'string'
  || typeof plugin.example !== 'string'
  || (
    keyExists(plugin, 'init')
    && typeof plugin.init !== 'function'
  )
  || (
    keyExists(plugin, 'end')
    && typeof plugin.end !== 'function'
  )
  || !keyExists(plugin, 'plugin')
  || typeof plugin.plugin !== 'function'
);
