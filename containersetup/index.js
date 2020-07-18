const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

// Connect to mySQL
// mongoose
//   .connect(
//     'mongodb://mongo:27017/docker-node-mongo',
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));
var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS || '123',
    database: process.env.MYSQL_DB || 'users'
});
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connection eshtablished succesfully....");
    }
});

app.get('/', (req, res) => {
    res.send("hi");
});

app.post('/item/add', (req, res) => {
    res.send("hi");
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));
