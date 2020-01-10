const express = require('express');
const debug = require('debug')('app');

const app = express();
const PORT = process.env.PORT || 3000;
const apis = require('./API/analyze.api');

app.use('/api', apis);

app.listen(PORT, () => {
  debug(`Server running on port ${PORT}`);
});
