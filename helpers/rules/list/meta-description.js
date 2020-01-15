const { objectOfPlugin } = require('../../utils');

const plugin = {
  tag: 'meta',
  ruleName: 'meta-description',
  desc: 'Meta tag with attr name must exists',
  example: '<meta name="description" content="website content" />',
  init: (an) => {
    an.locals.metaDescription = false;
    an.locals.metaContent = false;
  },
  plugin: (node, an) => {
    const len = node.attrs.length;
    if (len) {
      for (let i = 0; i < len; i++) {
        if (
          node.attrs[i].name === 'name'
          && node.attrs[i].value === 'description'
        ) {
          an.locals.metaDescription = true;
        }

        if (node.attrs[i].name === 'content') {
          an.locals.metaContent = true;
        }

        if (
          an.locals.metaDescription
          && an.locals.metaContent
        ) break;
      }
    }
  },
  end: (an) => {
    const rule = objectOfPlugin(plugin);
    if (
      !(an.locals.metaDescription
      && an.locals.metaContent)
    ) {
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
