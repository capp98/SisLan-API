const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const port = 3000;
var cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'API for SisLan' });
});

app.get('/services', db.getServices);
app.get('/services/:servico', (req, res) => {
  db.getServicesBy(req, res, req.params.servico);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
