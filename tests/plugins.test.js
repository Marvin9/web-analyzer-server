const fs = require('fs');
const path = require('path');
const { allRules } = require('../helpers/rules/plugins');
const pluginConstraint = require('./plugin.constrains');

const pluginsInDirectory = fs.readdirSync('./helpers/rules/list');

allRules.forEach((pluginName) => {
  describe(pluginName, () => {
    const pluginPath = path.resolve(process.cwd(), `./helpers/rules/list/${pluginName}.js`);
    const pluginExists = pluginsInDirectory.indexOf(`${pluginName}.js`) !== -1;

    it('must exist in directory', () => {
      if (
        !pluginExists
      ) throw new Error();
    });

    if (pluginExists) {
      const plugin = require(pluginPath); // eslint-disable-line
      it('must have satisfy all constraints', () => {
        if (
          pluginConstraint(plugin)
        ) throw new Error();
      });
    }
  });
});
