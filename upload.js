const csv = require('fast-csv');
const mongoose = require('mongoose');
const User = require('./models/userSchema').User;
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;



// 1. Загрузить CSV файл. Файл необходимо распарсить и сохранить данные в базе
exports.task1 = function (req, res) {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    const userFile = req.files.file;
    let users = [];


    csv
        .fromString(userFile.data.toString(), {
            headers: true,
            ignoreEmpty: true
        })
        .on("data", function (data) {
            data['_id'] = new mongoose.Types.ObjectId();

            users.push(data);

        })
        .on("end", function () {
            User
                .create(users, function (err, documents) {
                    if (err) throw err;
                });
            res.send(users.length + ' users have been successfully uploaded.');
        });
};


// 2. Получить коллекцию пользователей в json формате
exports.task2 = function (req, res) {
    User
        .find({})
        .exec(function (err, users) {
            if (err) {
                return res.status(500).send("Error while finding users");
            }
            if (!users) {
                return res.status(404).send("Not found users");
            }
            if (users.length === 0) {
                return res.send("There are no users");
            }
            let data = JSON.stringify(users);
            fs.writeFile('users.json', data, function (error, data) {
            });
            res.status(200).send(users);
        });

};

// 3. Скачать CSV файл. Необходимо сериализовать коллекцию пользователей из базы в CSV файл и отправить его.
// необходимо доделать =\
exports.task3 = function (req, res) {

     const fields = ['userName', 'firstName', 'lastName', 'age'];
    User
        .find({})
        .exec(function (err, users) {
            if (err) {
                return res.status(500).send("Error while finding users");
            }
            if (!users) {
                return res.status(404).send("Not found users");
            }
            if (users.length === 0) {
                return res.send("There are no users");
            }
            console.log(users);
            const json2csvParser = new Json2csvParser({ fields });
            const csv = json2csvParser.parse(users);
            fs.appendFile('users.csv', csv, function (error, data) {
            });
            console.log(csv);
        });
};