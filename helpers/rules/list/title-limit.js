const { objectOfPlugin } = require('../../utils');

const plugin = {
  tag: 'title',
  ruleName: 'title-limit',
  desc: 'title should not exceed 70 characters.',
  example: '<title> Stock market - Top brand </title>',
  plugin: (node, an) => {
    const text = node.childNodes[0].value;
    const rule = objectOfPlugin(plugin);
    if (text.length > 70) {
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
