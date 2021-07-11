const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const api = require('./api');

app.use('/', express.static('static'));

app.use(express.json())

app.use('/api', api);

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`)
});