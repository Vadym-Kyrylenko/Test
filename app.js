const express = require('express');
const fileUpload = require('express-fileupload');
require('./models/db');
const routes = require('./routes');

const app = express();
const port = 3000;

app.use(fileUpload());

app.get('/', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use('/', routes);

app.listen(port, () => console.log(`Server started at port ${port}`));

module.exports.app = app;
