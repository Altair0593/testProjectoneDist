let helpGroupApp = require("./static/src/helpers/groupRequests")

var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");



const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '7485184A',
    port: 5432,
});


client.connect(function (err) {
    console.log("Connected!");
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



var authorizated;
var teacherId;

app.post("/authorization", function (req, res) {

    var user = {
        login: req.body.login,
        password: req.body.password,
    };
    var baseLogin;
    var basePassword;
    client.query(`SELECT * FROM teachers WHERE login = '${user.login}';`, [], function (err, result) {
        for (var key in result.rows) {

            baseLogin = result.rows[key].login;
            basePassword = result.rows[key].password;
            teacherId = result.rows[key].teachers_id;

        }
        if (baseLogin === `${user.login}` && basePassword === `${user.password}`) {

            res.json(result.rows)
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
        phone: req.body.phone,
        keyword: req.body.keyword
    };
    client.query(`SELECT * FROM teachers WHERE login = '${user.login}';`, [], function (err, result) {
        console.log(result.rows, `${user.login}`);
        var baselogin;
        for (var key in result.rows) {
            console.log(`${user.login}`)
            baselogin = result.rows[key].login;
        }
        if (baselogin !== `${user.login}`) {
            var newUser = `INSERT INTO teachers(login, password, email, phone_number,keyword) VALUES ('${user.login}', '${user.password}', '${user.email}', '${user.phone}','${user.keyword}')`;
            client.query(newUser, []);
        } else {
            res.status(400).send('Bad Request ');
        }


    });

});

app.post("/groupStudent", helpGroupApp.getGroupOfStudents);

app.post("/getAllGroups", helpGroupApp.getAllGroups);

app.get("/accountSetting", function (req, res) {

    client.query(`SELECT * FROM teachers WHERE teachers_id = '${teacherId}';`, [], function (err, result) {
        console.log(result.rows);
        res.json(result.rows);
    });

});

app.post("/groups", function (req, res) {

    var groupId;
    var newGroup = `INSERT INTO groups(groupname, teacher_id) VALUES 
    ('${req.body.groupName}', ${req.body.teachers_id})`;
    client.query(newGroup, [],
        function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result.rows);

        });
    client.query(`SELECT * FROM groups WHERE groupname = '${req.body.groupName}';`, [], function (err, result) {

        res.json(result.rows[0].groups_id);
    });
});



app.post("/", async function (req, res) {


    var user = {
        username: req.body.username,
        age: req.body.age,
        lastname: req.body.lastname,
        city: req.body.city,
        groups_id: req.body.groups_id
    };

        var newUser = `INSERT INTO students( firstname, lastname, age, city, groups_id) VALUES
    ('${user.username}', '${user.lastname}', '${user.age}', '${user.city}', ${user.groups_id}) RETURNING user_id` ;
        client.query(newUser, [],
            function (err, result) {
            console.log(result.rows)
                if (err) {

                    res.status(400).send("error")
                }
                res.json(result.rows)
               // res.status(200).send("ok")
            })

});



app.post("/update", function (req, res) {
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
        }
        valueCounter++;
    }, user);

    queryComand = queryComand.substring(0, queryComand.length - 1);
    console.log(upgradeSQL, queryComand);

    client.query(`UPDATE students SET ${queryComand} WHERE user_id = ${userID.id}`,
        upgradeSQL,
        function (err, result) {
            if (err) {
                res.status(401).send("error")
            }else {
                res.status(200).send("ok")
            }

        });




});

app.post("/delete", function (req, res) {

    var id = req.body.id;
    client.query(`DELETE FROM students WHERE user_id = ${id}`, [], function (err, result) {
        if (err) {
            res.status(401).send("error")
        }else {
            res.status(200).send("ok")
        }
    });
});

app.listen(helpGroupApp.port, function () {
    console.log("port: " + helpGroupApp.port)
});


app.post("/accountupdate", function (req, res) {
    var teacherId = {
        id: req.body.teachers_id
    };
    var teachersSqlColumn = [
        "login",
        "password",
        "email",
        "phone_number",
        "about_myself",
         // "teacher_icon"
    ];

    var queryComand = "";

    var valueCounter = 0;
    var counterLink = 1;

    var user = {
        login: req.body.login,
        password: req.body.password,
        email: req.body.email,
        phone_number: req.body.phone,
        about_myself: req.body.aboutMyself,
        // teacher_icon: req.body.teacher_icon
    };

    var upgradeSQL = [];

    Object.keys(user).forEach(function (key) {
        if (!(this[key].length === 0)) {
            upgradeSQL.push(`${this[key]}`);
            // if ()
            queryComand += teachersSqlColumn[valueCounter] + "= $" + counterLink + ",";

            counterLink++
        }
        valueCounter++;
    }, user);

    queryComand = queryComand.substring(0, queryComand.length - 1);
    console.log(teacherId.id , upgradeSQL, queryComand);

    client.query(`UPDATE teachers SET ${queryComand} WHERE teachers_id = ${teacherId.id}`,
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
