const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const apis = require('./API/analyze.api');

app.use(cors());

app.use('/api', apis);

app.listen(PORT, () => {
  console.log(`API served on port ${PORT}`);
});
