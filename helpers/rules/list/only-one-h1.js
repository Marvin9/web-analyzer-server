const { objectOfPlugin } = require('../../utils');

const plugin = {
  tag: 'h1',
  ruleName: 'only-one-h1',
  desc: 'Your page must have only one h1 per page',
  example: '<h1>Main heading of page</h1>',
  init: (an) => {
    an.locals.h1Count = 0;
  },
  plugin: (node, an) => {
    an.locals.h1Count++;
  },
  end: (an) => {
    const rule = objectOfPlugin(plugin);
    if (an.locals.h1Count > 1) {
      an.report = [...an.report, Object.assign(rule,
        {
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
