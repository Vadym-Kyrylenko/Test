const csv = require('fast-csv');
const mongoose = require('mongoose');
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;
const { User } = require('../models/userSchema');

// 1. Загрузить CSV файл. Файл необходимо распарсить и сохранить данные в базе
module.exports.task1 = (req, res) => {
  if (!req.files) {
    res.status(400).send('No files were uploaded.');
  }

  const userFile = req.files.file;
  const users = [];

  csv
    .fromString(userFile.data.toString(), {
      headers: true,
      ignoreEmpty: true,
    })
    .on('data', (data) => {
      data._id = new mongoose.Types.ObjectId();
      users.push(data);
    })
    .on('end', () => {
      User
        .create(users, (err) => {
          if (err) throw err;
        });
      res.send(`${users.length} users have been successfully uploaded.`);
    });
};

// 2. Получить коллекцию пользователей в json формате
module.exports.task2 = (req, res) => {
  User
    .find({})
    .exec((err, users) => {
      if (err) {
        res.status(500).send('Error while finding users');
      }
      if (!users) {
        res.status(404).send('Not found users');
      }
      if (users.length === 0) {
        res.send('There are no users');
      }
      const data = JSON.stringify(users);
      fs.writeFile('users.json', data, (error) => {
        console.log(error);
      });
      res.status(200).send(users);
    });
};

// 3. Скачать CSV файл. Необходимо сериализовать коллекцию пользователей
// из базы в CSV файл и отправить его
module.exports.task3 = (req, res) => {
  const fields = ['userName', 'firstName', 'lastName', 'age'];
  User
    .find({})
    .exec((err, users) => {
      if (err) {
        res.status(500).send('Error while finding users');
      }
      if (!users) {
        res.status(404).send('Not found users');
      }
      if (users.length === 0) {
        res.send('There are no users');
      }

      const json2csvParser = new Json2csvParser({ fields, header: false, quote: '' });
      const json2csv = json2csvParser.parse(users);
      fs.appendFile('public/users.csv', `${json2csv}\n`, (error) => {
        console.log(error);
        res.writeHead(200, { 'Content-disposition': 'attachment; filename=users.csv' });
        fs.createReadStream('public/users.csv').pipe(res);
      });
    });
};
