const express = require ('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const upload = require('./upload.js');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/artjoker');

app.use(fileUpload());

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html')
);


app.post('/', upload.task1);

app.get('/task2', upload.task2);

app.get('/task3', upload.task3);


app.listen(port, () => console.log('Server started at port ' + port));