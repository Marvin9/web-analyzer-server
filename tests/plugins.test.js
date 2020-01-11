const fs = require('fs');
const path = require('path');
const pluginList = require('../helpers/rules/plugins');
const pluginConstraint = require('./plugin.constrains');

pluginList.forEach((pluginName) => {
  describe(pluginName, () => {
    const pluginPath = path.resolve(process.cwd(), `./helpers/rules/list/${pluginName}.js`);
    const pluginExists = fs.existsSync(pluginPath);

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
