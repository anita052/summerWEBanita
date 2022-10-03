const sql = require('./db');
var path = require('path');
const { FORMERR } = require('dns');


const createNewUser = (req, res)=>{
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    console.log("checkkkkkkkkk"); 
    console.log(req.body.DogGender+ "FDFD");
    var NewUser = {
        //condition ? exprIfTrue : exprIfFalse
        "Email": req.body.email,
        "password": req.body.pswd1,
        "Fullname":req.body.fname,
        "Phone": req.body.Phone ? req.body.Phone : null,
        "DogName":req.body.DogName ? req.body.DogName : null,
        "DogBreed":req.body.DogBreed ? req.body.DogBreed : null,
        "DogGender":req.body.DogGender!= '0' ? req.body.DogGender : null,
        "DogAge":req.body.DogAge!= '0' ? req.body.DogAge :null,
        "DogWeight":req.body.DogWeight!= '0' ? req.body.DogWeight : null
    };
    console.log(NewUser);
    sql.query("INSERT INTO users SET ?", NewUser, (err, mysqlres)=>{
        if (err) {
            console.log("ERROR: ", err);
            res.status(400).send({message: "error in creating an account " + err});
            return;
        }
        console.log("New user created");
        res.redirect("/");
        return;
    } )

}; 

const Finduser = (req, res)=>{
    if (!req.body) {
        res.status(400).send({message: "serch cannot be empty"});
        return;        
    }
    // const User = req.query.SearchName;
    var User = req.body.email;
    var password=req.body.password;

    console.log(User+ "anita");
    sql.query("SELECT * FROM users where (Email =? AND password =?)" , [User,password] , (err, results, fields)=>{
        if (err) {
            console.log("ERROR IS: " + err);
            res.status(400).send("Somthing is wrong with query" + err);
            return;
        }
        if(results.length ==0){
            res.status(400).send({message: "error in creating an account " + err});
            return;
        }
        console.log("User found");
        // res.send(results);
        res.redirect("/search");
        return;
    });
};
const tableCalculate =(req, res,next)=>{
    const lat1=22;
    const log1=23;
    sql.query("UPDATE dogsiters SET Distance= (3956 * 2 * ASIN(SQRT( POWER(SIN((? - abs(dogsiters.Latitude)) * pi()/180 / 2), 2) + COS(? * pi()/180 ) * COS(abs(dogsiters.Latitude)* pi()/180)* POWER(SIN((? - dogsiters.Longitude) * pi()/180 / 2), 2) )))",[lat1,log1,log1])

    var x= 32.321458;
    var y=34.853196;
    console.log("KLKLKL");
    sql.query("SELECT * FROM dogsiters",(err, mysqlre)=>{
        console.log("בפנים");
        if (err) {
            console.log("ERROR IS: " + err);
            res.status(400).send("Somthing is wrong with query" + err);
            return;
        }
        console.log(mysqlre);
        console.log("taaa");
        return;

        // var data=mysqlre;
        // var table = "" ;
 
		// for(var i in data){
		// 	table += "<tr>";
		// 	table += "<td>" 
		// 			+ data[i].Id +"</td>" 
		// 			+ "<td>" + data[i].FullName +"</td>" 
		// 			+ "<td>" + data[i].City +"</td>" ;
		// 	table += "</tr>";
		// }
 
	// document.getElementById("myTable").innerHTML = table;
        // return;
    });
    
    // sql.query("DECLARE @orig_lat DECIMAL DECLARE @orig_lng DECIMAL SET @orig_lat=53.381538 set @orig_lng=-1.463526 SELECT *,3956 * 2 * ASIN(SQRT( POWER(SIN((@orig_lat - abs(dogsiters.Latitude)) * pi()/180 / 2), 2) + COS(@orig_lng * pi()/180 ) * COS(abs(dogsiters.Latitude) * pi()/180)   * POWER(SIN((@orig_lng - dogsiters.Longitude) * pi()/180 / 2), 2) )) AS distance FROM dogsiters")


}   


//help function that calculate dist
// function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
//     var R = 6371; // Radius of the earth in km
//     var dLat = deg2rad(lat2-lat1);  // deg2rad below
//     var dLon = deg2rad(lon2-lon1); 
//     var a = 
//       Math.sin(dLat/2) * Math.sin(dLat/2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
//       Math.sin(dLon/2) * Math.sin(dLon/2)
//       ; 
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//     var d = R * c; // Distance in km
//     return d.toFixed(3);
//   }
  
//   function deg2rad(deg) {
//     return deg * (Math.PI/180)
//   }



module.exports = {createNewUser, Finduser,tableCalculate};