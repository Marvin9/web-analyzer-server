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
    if (an.locals.title === 0) {
      an.report.push({
        ruleName: plugin.ruleName,
        desc: plugin.desc,
        example: plugin.example,
      });
    }
  },
};

module.exports = plugin;
