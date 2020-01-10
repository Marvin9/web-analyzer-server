const request = require('request');
const parse5 = require('parse5');

const generateTree = (url, cb) => {
  request(url, (err, res, body) => {
    if (err || res.statusCode !== 200) cb(err, null);
    else cb(null, parse5.parse(body));
  });
};

const keyExists = (obj, key) => {
  if (typeof obj !== 'object') return false;
  return Object.prototype.hasOwnProperty.call(obj, key);
};

module.exports = {
  generateTree,
  keyExists,
};
