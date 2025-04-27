const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'poweruser',
    password: 'adm!n',
    database: 'healthcare'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Routes
app.get('/api/patients', (req, res) => {
    let sql = 'SELECT * FROM patients';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/api/patients', (req, res) => {
    let newPatient = req.body;
    let sql = 'INSERT INTO patients SET ?';
    db.query(sql, newPatient, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
