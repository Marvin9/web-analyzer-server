const request = require('request');
const { objectOfPlugin } = require('../../utils');

const plugin = {
  tag: 'html',
  ruleName: 'robots-txt',
  desc: 'Website should have robots.txt',
  example: '',
  plugin: (node, an) => {
    const rule = objectOfPlugin(plugin);
    const url = new URL(an.url);

    url.pathname = 'robots.txt';

    return new Promise((resolve) => {
      request(url.toString(), (err, res, body) => {
        if (err || body === undefined || res.statusCode === 404) {
          an.report = [...an.report, Object.assign(rule, {
            follow: false,
          })];
          resolve(1);
        } else {
          an.report = [...an.report, Object.assign(rule, {
            follow: true,
          })];
          resolve(1);
        }
      });
    });
  },
};

module.exports = plugin;
