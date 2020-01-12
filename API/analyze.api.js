const express = require('express');

const analyzer = express.Router();
const Analyzer = require('../helpers/Analyzer');
const { generateTree } = require('../helpers/utils');

const an = new Analyzer();

analyzer.get('/analyze', (req, res) => {
  an.report = [];
  const url = req.query || null;
  // todo validate url

  generateTree(url, (err, tree) => {
    if (err) {
      if (err.error) {
        res.send({
          error: true,
          desc: 'Url was forbidden',
          code: 200
        });
      }
      else res.status(404).send({
        error: true,
        code: 404,
        desc: 'Internal error',
        err
      });
    } // todo handle error
    else {
      an.reporter(tree);
      res.send(an.report);
    }
  });
});

module.exports = analyzer;
