const express = require('express');

const analyzer = express.Router();
const Analyzer = require('../helpers/Analyzer');
const { generateTree, sanitizeUrl } = require('../helpers/utils');

const an = new Analyzer();

analyzer.get('/analyze', (req, res) => {
  an.report = [];
  const url = req.query || null;
  // todo validate url
  if (url === null || url.url.length > 2048) {
    res.send({
      error: true,
      code: 404,
      desc: 'Url length should not exceed 2048 characters or it should not be null',
    });
  } else {
    const sanitizedUrl = sanitizeUrl(url.url);
    generateTree(sanitizedUrl, (err, tree) => {
      if (err) {
        if (err.error) {
          res.send({
            error: true,
            desc: 'Url was forbidden',
            code: 200,
          });
        } else {
          res.status(404).send({
            error: true,
            code: 404,
            desc: 'Internal error',
            err,
          });
        }
      } else {
        an.reporter(tree, sanitizedUrl, () => {
          res.send(an.report);
        });
      }
    });
  }
});

module.exports = analyzer;
