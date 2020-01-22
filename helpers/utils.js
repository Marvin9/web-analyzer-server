const request = require('request');
const parse5 = require('parse5');
const urlUtil = require('url');

const generateTree = (url, cb) => {
  request(url, (err, res, body) => {
    if (err) cb(err, null);
    else if (res.statusCode !== 200) cb({ error: 200 }, null);
    else cb(null, parse5.parse(body));
  });
};

const keyExists = (obj, key) => {
  if (typeof obj !== 'object') return false;
  return Object.prototype.hasOwnProperty.call(obj, key);
};

const objectOfPlugin = (plugin) => ({
  ruleName: plugin.ruleName,
  desc: plugin.desc,
  example: plugin.example,
});


const sanitizeUrl = (url) => {
  const protocolSubdomainDomain = /http(s)?:\/\/\w+\.\w+\.\w+/i;
  const protocolDomain = /http(s)?:\/\/\w+\.\w+/i;
  const subdomainDomain = /\w+\.\w+\.\w+/i;
  const domain = /\w+\.\w+/i;

  if (protocolSubdomainDomain.test(url)) {
    return url;
  }

  if (protocolDomain.test(url)) {
    const sanitizedUrl = urlUtil.parse(url);
    return `${sanitizedUrl.protocol}//www.${sanitizedUrl.host}${sanitizedUrl.path}`;
  }

  if (subdomainDomain.test(url)) {
    return `https://${url}`;
  }

  if (domain.test(url)) {
    return `https://www.${url}`;
  }

  return '';
};

module.exports = {
  generateTree,
  keyExists,
  objectOfPlugin,
  sanitizeUrl,
};
