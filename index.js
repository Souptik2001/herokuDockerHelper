const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
var connectionDetails = {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS || '',
    database: process.env.MYSQL_DB || 'unsafeDB'
};

var connection;
function createTable(){
    const q = "CREATE TABLE `unsafeDB`.`users` ( `id` INT(225) NOT NULL AUTO_INCREMENT , `firstName` VARCHAR(225) NOT NULL , `lastName` VARCHAR(225) NOT NULL , `address` VARCHAR(225) NOT NULL , `city` VARCHAR(225) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB";
    connection.query(q, (err, result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            // var q = "INSERT INTO `users`(`firstName`, `lastName`, `address`, `city`) VALUES ('Julian', 'Poulsen','XYZ','ABC'); INSERT INTO `users`(`firstName`, `lastName`, `address`, `city`) VALUES ('Albert', 'Lamo','XYZ','ABC'); INSERT INTO `users`(`firstName`, `lastName`, `address`, `city`) VALUES ('Michael', 'Gonzalez','XYZ','ABC');";
            var q = "INSERT INTO `users`(`firstName`, `lastName`, `address`, `city`) VALUES ('Julian', 'Poulsen','XYZ','ABC');";
            connection.query(q, (err, result)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                    const q = "CREATE TABLE `unsafeDB`.`users_cred` ( `id` INT(225) NOT NULL AUTO_INCREMENT , `firstName` VARCHAR(225) NOT NULL , `lastName` VARCHAR(225) NOT NULL , `creditCard` VARCHAR(225) NOT NULL , `pin` VARCHAR(225) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB";
                    connection.query(q, (err, result)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log(result);
                            // var q = "INSERT INTO `users_cred`(`firstName`, `lastName`, `creditCard`, `pin`) VALUES ('Julian', 'Poulsen','22424234','34234'); INSERT INTO `users_cred`(`firstName`, `lastName`, `creditCard`, `pin`) VALUES ('Albert', 'Lamo','22424234','34234'); INSERT INTO `users_cred`(`firstName`, `lastName`, `creditCard`, `pin`) VALUES ('Michael', 'Gonzalez','22424234','34234');";
                            var q = "INSERT INTO `users_cred`(`firstName`, `lastName`, `creditCard`, `pin`) VALUES ('Julian', 'Poulsen','22424234','34234');";
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
    // const q = "SELECT * FROM users_cred";
    // connection.query(q, (err, result)=>{
    //     if(err){
    //         res.json({
    //             error : err
    //         });
    //     }else{
    //         res.json({
    //             success: result
    //         });
    //     }
    // });
    var items = [];
    res.render('index', { items });
});

app.get('/item', (req, res) => {
    var items = [];
    if(req.body.name!=''){
        var q = `SELECT * FROM users WHERE firstName='${req.query.name}'`;
        connection.query(q, (err, result)=>{
            if(err){
                items = [err];
            }else{
                items = result;
            }
            res.render('index', { items });
        });
    }
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));
