const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
var connectionDetails = {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS || '123',
    database: process.env.MYSQL_DB || 'users'
};

var connection = mysql.createConnection(connectionDetails);
function connectDataBase(){
    connection.connect((err) => {
        if (err) {
            setTimeout(connectDataBase, 1000);
            console.log(err);
        } else {
            console.log("Connection eshtablished succesfully....");
        }
    });
}
connectDataBase();

function createTable(){
    const q = `CREATE TABLE Persons (
        PersonID int,
        LastName varchar(255),
        FirstName varchar(255),
        Address varchar(255),
        City varchar(255)
    );`;
    connection.query(q, (err, result)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    });
}

app.get('/', (req, res) => {
    const q = "SELECT * FROM users_cred";
    connection.query(q, (err, result)=>{
        if(err){
            res.json({
                error : err
            });
        }else{
            res.json({
                success: result
            });
        }
    });
});

app.post('/item/add', (req, res) => {
    res.send("hi");
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));
