const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const analyzeAPI = require('./API/analyze.api');
const rulesListAPI = require('./API/rules.api');

app.use(cors());

app.use('/api', analyzeAPI);
app.use('/api', rulesListAPI);

app.listen(PORT, () => {
  console.log(`API served on port ${PORT}`);
});
