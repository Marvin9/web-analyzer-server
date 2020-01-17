const { objectOfPlugin } = require('../../utils');

const plugin = {
  tag: 'meta',
  ruleName: 'meta-responsive',
  desc: 'Website must contain meta responsive tag',
  example: '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
  init: (an) => {
    an.locals.metaViewport = false;
    an.locals.metaViewportContent = false;
  },
  plugin: (node, an) => {
    const len = node.attrs.length;
    for (let i = 0; i < len; i++) {
      if (
        node.attrs[i].name === 'name'
        && node.attrs[i].value === 'viewport'
      ) an.locals.metaViewport = true;

      if (
        node.attrs[i].name === 'content'
      ) an.locals.metaViewportContent = true;

      if (
        an.locals.metaViewport
        && an.locals.metaViewportContent
      ) break;
    }
  },
  end: (an) => {
    const rule = objectOfPlugin(plugin);
    const follow = an.locals.metaViewport && an.locals.metaViewportContent;
    an.report = [...an.report, Object.assign(rule, {
      follow,
    })];
  },
};

module.exports = plugin;
