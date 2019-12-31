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

    client.query('SELECT * FROM student ORDER BY user_id;', [], function (err, result) {

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

    var newUser = `INSERT INTO student(user_id, firstname, lastname, age, city) VALUES ('${user.id}', '${user.username}', '${user.lastname}', '${user.age}', '${user.city}')`;
    client.query(newUser,[],
        function (err, result) {
            if (err) {
                console.log(err);
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
    var userID = {
        id: req.body.id
    };

    var queryColomn = [
        "firstname",
        "lastname",
        "age",
        "city"
    ];

    var queryComand = "";

    var valueCounter = 0;
    var counterLink = 1;

    var user = {
        username: req.body.username,
        lastname: req.body.lastname,
        age: req.body.age,
        city: req.body.city
    };

    var upgradeSQL = [];

    Object.keys(user).forEach(function (key) {
        if (!(this[key].length === 0)) {
            upgradeSQL.push(`${this[key]}`);
            // if ()
            queryComand += queryColomn[valueCounter] + "= $" + counterLink + ",";

            counterLink++
        };
        valueCounter++;
    }, user);

    queryComand = queryComand.substring(0, queryComand.length - 1);
    console.log(upgradeSQL, queryComand);

    client.query(`UPDATE student SET ${queryComand} WHERE user_id = ${userID.id}`,
        upgradeSQL,
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
