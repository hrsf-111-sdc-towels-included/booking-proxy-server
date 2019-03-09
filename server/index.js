const express = require('express');
//const bodyParser = require('body-parser');
const proxy = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 3000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../public')));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const proxyTable = {
  '/api/booking': 'http://localhost:3002',
};

const options = {
  target: '/',
  router: proxyTable,
};

const myProxy = proxy(options);

app.use(myProxy);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
