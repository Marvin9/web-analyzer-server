const { objectOfPlugin } = require('../../utils');

const plugin = {
  tag: 'title',
  ruleName: 'title-must',
  desc: 'Your website must have title',
  example: '<title> Hello </title>',
  init: (an) => {
    an.locals.title = 0;
  },
  plugin: (node, an) => {
    an.locals.title++;
  },
  end: (an) => {
    const rule = objectOfPlugin(plugin);
    if (an.locals.title === 0) {
      an.report = [...an.report, Object.assign(rule, {
        follow: false,
      })];
    } else {
      an.report = [...an.report, Object.assign(rule, {
        follow: true,
      })];
    }
  },
};

module.exports = plugin;
