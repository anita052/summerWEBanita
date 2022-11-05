var SQL = require('./db');
const path = require('path');
const csv=require('csvtojson');

const CreateDogsiters = (req,res)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS dogsiters (id int(11) NOT NULL PRIMARY KEY , FullName VARCHAR(255), City VARCHAR(255), Phone VARCHAR(255), Experience integer, Cost float,freeText text, Latitude float(13,11),Longtitude float(13,11), Site text,Rate float,countRaters int)";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
    })      
};

const CreateUsers = (req,res)=> {
    var Q2 = "CREATE TABLE IF NOT EXISTS users (Email varchar(255) NOT NULL PRIMARY KEY , password VARCHAR(255),Fullname VARCHAR(255),Phone VARCHAR(255),DogName VARCHAR(255),DogBreed VARCHAR(255), DogGender VARCHAR(255), DogAge VARCHAR(255), DogWeight VARCHAR(255))";
    SQL.query(Q2,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
    })      
};
const CreateRate = (req,res)=> {
    var Q3 = "CREATE TABLE IF NOT EXISTS rate (userEmail varchar(255) NOT NULL ,dogsitterId int(11) NOT NULL, rate float,PRIMARY KEY (userEmail,dogsitterId),FOREIGN KEY (userEmail) REFERENCES users(Email),FOREIGN KEY (dogsitterId) REFERENCES dogsiters(id) )";
    SQL.query(Q3,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
    })      
};



const InsertDataToUsers = (req,res)=>{
    var Q4 = "INSERT INTO users SET ?";
    const csvFilePath= path.join(__dirname, "users2.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    jsonObj.forEach(element => {
        var NewEntry = {
            "Email": element.Email,
            "password": element.password,
            "Fullname":element.Fullname,
            "Phone": element.Phone,
            "DogName": element.DogName,
            "DogBreed": element.DogBreed,
            "DogGender": element.DogGender,
            "DogAge":element.DogAge,
            "DogWeight":element.DogWeight
        }
        SQL.query(Q4, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
        });
    });
    })
};

const InsertDataToDogsiter = (req,res)=>{
    var Q5 = "INSERT INTO dogsiters SET ?";
    const csvFilePath2= path.join(__dirname, "dogsiters.csv");
    csv()
    .fromFile(csvFilePath2)
    .then((jsonObj)=>{
    jsonObj.forEach(element => {
        var NewEntry = {
            "id": element.id,
            "FullName": element.FullName,
            "City":element.City,
            "Phone": element.Phone,
            "Experience": element.Experience,
            "Cost": element.Cost,
            "freeText": element.freeText,
            "Latitude": element.Latitude,
            "Longtitude":element.Longtitude,
            "Site":element.Site,
            "Rate":element.Rate,
            "countRaters":element.countRaters
            
        }
        SQL.query(Q5, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
        });
    });
    })
};
const InsertDataToRate = (req,res)=>{
    var Q6 = "INSERT INTO rate SET ?";
    const csvFilePath2= path.join(__dirname, "rate.csv");
    csv()
    .fromFile(csvFilePath2)
    .then((jsonObj)=>{
    jsonObj.forEach(element => {
        var NewEntry = {
            "userEmail": element.userEmail,
            "dogsitterId": element.dogsitterId,
            "rate":element.rate,
          
        }
        SQL.query(Q6, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
        });
    });
    })
};

const ShowSDogsitersTable = (req,res)=>{
    var Q7 = "SELECT * FROM dogsiters";
    SQL.query(Q7, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
    })};

const ShowUsersTable = (req,res)=>{
    var Q8 = "SELECT * FROM users";
    SQL.query(Q8, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
    })};

const DropUsersTable = (req, res)=>{
    var Q9 = "DROP TABLE IF EXISTS users";
    SQL.query(Q9, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
    })
}

const DropDogsitersTable = (req, res)=>{
    var Q10 = "DROP TABLE IF EXISTS dogsiters";
    SQL.query(Q10, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
    })
}
const DroprateTable = (req, res)=>{
    var Q11 = "DROP TABLE IF EXISTS rate";
    SQL.query(Q11, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
    })
}

const InitDB = (req, res)=>{
    console.log("Init Database Start");
    DroprateTable();
    DropDogsitersTable();
    DropUsersTable();
    CreateDogsiters();
    CreateUsers();
    CreateRate();
    InsertDataToDogsiter();
    InsertDataToUsers();
    InsertDataToRate();
    console.log("Init Database End");
}

module.exports = {
    CreateUsers,
    CreateDogsiters,
    CreateRate,
    InsertDataToUsers,
    InsertDataToDogsiter,
    InsertDataToRate,
    ShowSDogsitersTable, 
    ShowUsersTable,
    DropUsersTable,
    DropDogsitersTable,
    DroprateTable,
    InitDB
 };

