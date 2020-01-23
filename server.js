var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");



const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '0000',
    port: 5432,
});


client.connect(function (err) {
    //if (err) throw err;
    console.log("Connected!");
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')));
app.use(function(req, res, next) {
    //console.log("USE");
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var port = 3000;


var authorizated;
var teacherId;
var groupId;
app.post("/authorization", function (req, res) {

    var user = {
        login: req.body.login,
        password: req.body.password,
    };

    client.query(`SELECT * FROM teachers WHERE login = '${user.login}';`, [], function (err, result) {

        var baseLogin;
        var basePassword;
        for (var key in result.rows) {

            baseLogin = result.rows[key].login;
            basePassword = result.rows[key].password;
            teacherId = result.rows[key].user_id;

        }
        if (baseLogin === `${user.login}` && basePassword === `${user.password}`) {
            authorizated = req.body.login;
            res.status(200).send();
        } else {
            authorizated = "";
            res.status(401).send('Unauthorized ');

        }


    });
});

app.post("/registration", function (req, res) {
    var user = {
        login: req.body.login,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone
    };
    client.query(`SELECT * FROM teachers WHERE login = '${user.login}';`, [], function (err, result) {
        console.log(result.rows, `${user.login}`);
        var baselogin;
        for (var key in result.rows) {
            console.log(`${user.login}`)
            baselogin = result.rows[key].login;
        }
        if (baselogin !== `${user.login}`) {
            var newUser = `INSERT INTO teachers(login, password, email, phone_number) VALUES ('${user.login}', '${user.password}', '${user.email}', '${user.phone}')`;
            client.query(newUser, []);
        } else {
            res.status(400).send('Bad Request ');
        }


    });

});
app.get("/", function (req, res) {
    console.log(`${groupId}`);
    var gid = 9
    client.query(`SELECT * FROM students WHERE groups_id = ${gid} ORDER BY user_id;`, [], function (err, result) {
        // console.log(result.rows);
        res.json(result.rows);
    });
});

app.get("/accountSetting", function (req, res) {

    client.query(`SELECT * FROM teachers WHERE user_id = '${teacherId}';`, [], function (err, result) {
        console.log(result.rows);
        res.json(result.rows);

    });

});

app.post("/groups", function (req, res) {
    console.log(req.body.groupName);
    console.log(`${teacherId}`);

    var newGroup = `INSERT INTO groups(groupname, teacher_id) VALUES 
    ('${req.body.groupName}', ${teacherId})`;
    client.query(newGroup, [],
        function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result.rows);

        });
    client.query(`SELECT * FROM groups WHERE teacher_id = '${teacherId}';`, [], function (err, result) {
        console.log(result.rows);
        for (var key in result.rows) {
            groupId = result.rows[key].user_id;
        }})
    });

app.post("/", function (req, res) {
    // console.log(req.body)
    console.log(`${groupId}`);

    var user = {
        username: req.body.username,
        age: req.body.age,
        lastname: req.body.lastname,
        city: req.body.city
    };
//server.js
    var newUser = `INSERT INTO students( firstname, lastname, age, city, groups_id) VALUES 
    ('${user.username}', '${user.lastname}', '${user.age}', '${user.city}', ${groupId})`;
    client.query(newUser, [],
        function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result);
        });
});

app.post("/update", function (req, res) {
    var userID = {
        id: req.body.id
    };
    console.log(req.body, userID.id)
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
        }
        valueCounter++;
    }, user);

    queryComand = queryComand.substring(0, queryComand.length - 1);
    console.log(upgradeSQL, queryComand);

    client.query(`UPDATE students SET ${queryComand} WHERE user_id = ${userID.id}`,
        upgradeSQL,
        function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result);
        });
});

app.post("/delete", function (req, res) {

    var id = req.body.id;
    client.query(`DELETE FROM students WHERE user_id = ${id}`, [], function (err, result) {
        if (err) {
            console.log(err)
        }
        console.log(result);
    });
});

app.listen(port, function () {
    console.log("port: " + port)
});


app.post("/accountupdate", function (req, res) {
    var userID = {
        id: req.body.user_id
    };
    var queryColomn = [
        "login",
        "email",
        "password",
        "phone_number"
    ];

    var queryComand = "";

    var valueCounter = 0;
    var counterLink = 1;

    var user = {
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
        phone_number: req.body.phone
    };

    var upgradeSQL = [];

    Object.keys(user).forEach(function (key) {
        if (!(this[key].length === 0)) {
            upgradeSQL.push(`${this[key]}`);
            // if ()
            queryComand += queryColomn[valueCounter] + "= $" + counterLink + ",";

            counterLink++
        }
        valueCounter++;
    }, user);

    queryComand = queryComand.substring(0, queryComand.length - 1);
    console.log(upgradeSQL, queryComand);

    client.query(`UPDATE teachers SET ${queryComand} WHERE user_id = ${userID.id}`,
        upgradeSQL,
        function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result);
        });
});

// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const config = require('./webpack.config.js');
// const compiler = webpack(config);
// app.use(webpackDevMiddleware(compiler, {
//     publicPath: config.output.publicPath,
// }));
