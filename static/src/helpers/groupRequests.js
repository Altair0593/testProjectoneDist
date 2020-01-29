module.exports ={
    getGroupOfStudents,
    getAllGroups,
    port:3000
}
const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '7485184A',
    port: 5432,
});
client.connect();


function getGroupOfStudents (req, res) {
    var userId = +req.body.name;
    client.query(`SELECT * FROM students WHERE groups_id = ${userId} ORDER BY user_id;`, [], function (err, result) {
        res.json(result.rows);
    });
}

function getAllGroups(req, res) {
    console.log(req.body.teachers_id)
    client.query(`SELECT * FROM groups WHERE teacher_id = ${req.body.teachers_id};`, [], function (err, result) {

        res.json(result.rows);
    });
}