const { objectOfPlugin } = require('../../utils');

const plugin = {
  tag: 'img',
  ruleName: 'img-alt',
  desc: 'Every image must contain alt tag',
  example: '<img src="some.jpg" alt="orage photo" />',
  init: (an) => {
    an.locals.imgAltError = 0;
  },
  plugin: (node, an) => {
    const len = node.attrs.length;
    if (len) {
      let altExist = 0;
      for (let i = 0; i < len; i++) {
        if (node.attrs[i].name === 'alt') {
          altExist = 1;
          break;
        }
      }
      if (!altExist) an.locals.imgAltError++;
    }
  },
  end: (an) => {
    const rule = objectOfPlugin(plugin);
    if (an.locals.imgAltError) {
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
