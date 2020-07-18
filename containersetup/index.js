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

var connection;
function createTable(){
    const q = "CREATE TABLE `users`.`users_cred` ( `id` INT(225) NOT NULL AUTO_INCREMENT , `firstName` VARCHAR(225) NOT NULL , `lastName` VARCHAR(225) NOT NULL , `address` VARCHAR(225) NOT NULL , `city` VARCHAR(225) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB";
    connection.query(q, (err, result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            var q = "INSERT INTO `users_cred`(`firstName`, `lastName`, `address`, `city`) VALUES ('Souptik', 'Datta','XYZ','ABC')";
            connection.query(q, (err, result)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                }
            });
        }
    });
}
function connectDataBase(){
    connection = mysql.createConnection(connectionDetails);
    connection.connect((err) => {
        if (err) {
            setTimeout(connectDataBase, 1000);
            console.log(err);
        } else {
            console.log("Connection eshtablished succesfully....");
            createTable();
        }
    });
}
connectDataBase();

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
