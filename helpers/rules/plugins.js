const plugins = [
  'title-limit',
  'title-must',
  'meta-description',
  'only-one-h1',
  'img-alt',
  'rel-canonical',
  'meta-responsive',
];

const allRules = [
  ...plugins,
  'robots-txt',
];

module.exports = {
  plugins,
  allRules,
};
