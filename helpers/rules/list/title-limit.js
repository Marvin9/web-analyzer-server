const plugin = {
  tag: 'title',
  ruleName: 'title-limit',
  desc: 'title should not exceed 70 characters.',
  example: '<title> Stock market - Top brand </title>',
  plugin: (node, an) => {
    const text = node.childNodes[0].value;
    if (text.length > 70) {
      an.report.push({
        ruleName: plugin.ruleName,
        desc: plugin.desc,
        example: plugin.example,
      });
    }
  },
};

module.exports = plugin;
