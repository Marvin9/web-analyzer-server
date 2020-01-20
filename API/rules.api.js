const express = require('express');

const rules = express.Router();
const { allRules } = require('../helpers/rules/plugins');

const structuredResponse = allRules.map((plugin) => {
  const pluginPath = `../helpers/rules/list/${plugin}.js`;
  const {
    tag, ruleName, desc, example,
  } = require(pluginPath); // eslint-disable-line
  return {
    tag,
    ruleName,
    desc,
    example,
  };
});

rules.get('/rules', (req, res) => {
  res.send(structuredResponse);
});

module.exports = rules;
