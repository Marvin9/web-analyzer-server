const { objectOfPlugin } = require('../../utils');

const plugin = {
  tag: 'link',
  ruleName: 'rel-canonical',
  desc: 'Web page should specify its primary name (it could be http://xyz.com or https://www.xyz.com)',
  example: '<link rel="canonical" href="https://www.yourwebsite.com" />',
  init: (an) => {
    an.locals.relCanonical = false;
  },
  plugin: (node, an) => {
    const len = node.attrs.length;
    let relCanonical = false;
    let href = false;
    for (let i = 0; i < len; i++) {
      if (
        node.attrs[i].name === 'rel'
        && node.attrs[i].value === 'canonical'
      ) relCanonical = true;

      if (node.attrs[i].name === 'href') href = true;
    }
    if (
      relCanonical
      && href
    ) an.locals.relCanonical = true;
  },
  end: (an) => {
    const rule = objectOfPlugin(plugin);
    if (!an.locals.relCanonical) {
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
