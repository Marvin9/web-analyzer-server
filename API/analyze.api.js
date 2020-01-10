const express = require('express');

const analyzer = express.Router();
const Analyzer = require('../helpers/Analyzer');
const { generateTree } = require('../helpers/utils');

const an = new Analyzer();

analyzer.get('/analyze', (req, res) => {
  const url = req.query || null;
  // todo validate url

  generateTree(url, (err, tree) => {
    if (err) res.status(404).send('Fail'); // todo handle error
    else {
      an.iterator(tree);
    }
  });
});

module.exports = analyzer;
