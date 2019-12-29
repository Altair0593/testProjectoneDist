var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");


const {Client} = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'testdb',
    password: '7485184A',
    port: 5432,
});


client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')));
var port = 8080;

app.get("/", function (req, res) {

    client.query('SELECT * FROM student;', [], function (err, result) {

        if (err) {
            return next(err)
        };
        res.json(result.rows);
    });

});

app.post("/", function (req, res) {

    var user = {
        id: req.body.id,
        username: req.body.username,
        age: req.body.age,
        lastname: req.body.lastname,
        city: req.body.city
    };

    var newUser = `INSERT INTO student(user_id, firstname, lastname, age, city) VALUES (${user.id}, '${user.username}', '${user.lastname}', ${user.age}, '${user.city}')`;
    client.query(newUser,[],
        function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    client.query(`SELECT * FROM student WHERE user_id = ${user.id};`, [], function (err, result) {

        if (err) {
            return next(err)
        };
        res.json(result.rows);
    });

});

app.put("/", function (req, res) {
    var user = {
        id: req.body.id,
        username: req.body.username,
        age: req.body.age,
        lastname: req.body.lastname,
        city: req.body.city
    };

    client.query(`UPDATE student SET firstname = $1, lastname = $2, age = $3, city = $4  WHERE user_id = ${user.id}`,
        [`${user.username}`, `${user.lastname}`, `${user.age}`, `${user.city}`],
        function (err, result) {
        if (err) {
            throw err;
        }
        console.log(result);
    });
});

app.delete("/:id", function (req, res) {

    var id = (req.params.id).slice(1);
    client.query(`DELETE FROM student WHERE user_id = ${id}`, [], function (err, result) {
        if (err) {
            throw err;
        }
        console.log(result);
    });
});

app.listen(port, function () {
    console.log("port: " + port)
});


