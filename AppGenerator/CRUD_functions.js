const sql = require('./db');
var path = require('path');
const { FORMERR } = require('dns');
const exp = require('constants');


const createNewUser = (req, res)=>{
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
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
            const f1="User is already exist";
            const f2="";
            res.status(200).render('fail', {varFail1:f1 , varFail2:f2});
            console.log("user exsist in DB");
            return; 
        }
        console.log("New user created");
        res.render("signin");
        return;
    } )

}
    //find user from database
    const Finduser = (req, res,next)=>{
    if (!req.body) {
        res.status(400).send({message: "serch cannot be empty"});
        return;        
    }
    var User = req.body.email;
    var password=req.body.password;
    sql.query("SELECT * FROM users where (Email =? AND password =?)" , [User,password] , (err, results, fields)=>{
        if (err) {
            console.log("ERROR IS: " + err);
            res.status(400).send("Somthing is wrong with query" + err);
            return;
        }
        if(results.length ==0){
            const f1="User is not found in database,";
            const f2="User Name or Password are incorrect.";
            res.status(200).render('fail', {varFail1:f1 , varFail2:f2});
            console.log("user doesnt exsist DB");
            return; 
        }
        console.log("User found");
        const lat1=req.body.GeoLat;
        const log1=req.body.GeoLong;
        res.render('Search2',{GeoLong : log1,GeoLat :lat1 });
        return;
    } );
};

//show dogsiter table
const ShowAllDogiSiters = (req,res)=>{
    const lat1=req.body.GeoLat;
    const log1=req.body.GeoLong;
    const Q2 ="SELECT *, ROUND((3956 * 2 * ASIN(SQRT( POWER(SIN((? - abs(dogsiters.Latitude)) * pi()/180 / 2), 2) + COS(? * pi()/180 ) * COS(abs(dogsiters.Latitude)* pi()/180)* POWER(SIN((? - dogsiters.Longitude) * pi()/180 / 2), 2) ))),1) AS Distance FROM dogsiters ORDER BY Distance ";
    sql.query(Q2,[lat1,log1,log1], (err, mysqlres)=>{
        if (err) {
            console.log("error in getting all dogsiters " + err);
            res.status(400).send({message:"error in getting all dogsiters " + err})
            return;
        }
        console.log("success... ");
        res.render('Results', {
            pple: mysqlres
        });
        return;
    });
};

//dog sitter table filterd
const searchDogsitter = (req,res)=>{
    var Q4;
    var Values=[];
    var log1=req.body.GeoLong;
    var lat1=req.body.GeoLat;
    var rate=req.body.rankFilter;
    console.log("shuki");
    console.log(rate);
    var city=req.body.city;
    if(city!=0){
        city=CheckCity(city);
    }
    console.log("city"+city)
    var experience=req.body.expFilter;
    console.log("tooki");
    console.log(experience);
    var sort=req.body.sort;

    if(rate==undefined && experience == undefined){
        const f3="No Dogsitter rate and experirnce fielfd was entered";
        const f4="You must choose Dogsitter rate and experirnce";
        res.status(200).render('fail', {varFail1:f3 , varFail2:f4});
        return; 
    }
    if(rate==undefined){
        const f3="No Dogsitter rate field was entered";
        const f4="You must choose Dogsitter rate ";
        res.status(200).render('fail', {varFail1:f3 , varFail2:f4});
        return; 
    }
    if(experience == undefined){
        const f3="No Dogsitter experirnce field was entered";
        const f4="You must choose Dogsitter experirnce";
        res.status(200).render('fail', {varFail1:f3 , varFail2:f4});
        return; 
    }
    // city and not geo location
    if(city==0 && sort==0 ){
        Q4=" SELECT *, ROUND((3956 * 2 * ASIN(SQRT( POWER(SIN((? - abs(dogsiters.Latitude)) * pi()/180 / 2), 2) + COS(? * pi()/180 ) * COS(abs(dogsiters.Latitude)* pi()/180)* POWER(SIN((? - dogsiters.Longtitude) * pi()/180 / 2), 2) ))),1) AS Distance FROM dogsiters WHERE Experience >= ? AND Rate >= ? ORDER BY Distance ";
        Values=[lat1,log1,log1,experience,rate];
    }
    // no filter of city or range
    if(city==0 && sort==1){
        Q4=" SELECT *, ROUND((3956 * 2 * ASIN(SQRT( POWER(SIN((? - abs(dogsiters.Latitude)) * pi()/180 / 2), 2) + COS(? * pi()/180 ) * COS(abs(dogsiters.Latitude)* pi()/180)* POWER(SIN((? - dogsiters.Longtitude) * pi()/180 / 2), 2) ))),1) AS Distance FROM dogsiters WHERE Experience >= ? AND Rate >= ? ORDER BY Rate DESC ";
        Values=[lat1,log1,log1,experience,rate];
    }
    // filter of range
    if(city==0 && sort==2){   
       Q4=" SELECT *, ROUND((3956 * 2 * ASIN(SQRT( POWER(SIN((? - abs(dogsiters.Latitude)) * pi()/180 / 2), 2) + COS(? * pi()/180 ) * COS(abs(dogsiters.Latitude)* pi()/180)* POWER(SIN((? - dogsiters.Longtitude) * pi()/180 / 2), 2) ))),1) AS Distance FROM dogsiters WHERE Experience >= ? AND Rate >= ? ORDER BY Cost ASC ";
       Values=[lat1,log1,log1,experience,rate];
    }
    if(city!=0 && sort==0 ){
        Q4=" SELECT *, ROUND((3956 * 2 * ASIN(SQRT( POWER(SIN((? - abs(dogsiters.Latitude)) * pi()/180 / 2), 2) + COS(? * pi()/180 ) * COS(abs(dogsiters.Latitude)* pi()/180)* POWER(SIN((? - dogsiters.Longtitude) * pi()/180 / 2), 2) ))),1) AS Distance FROM dogsiters WHERE Experience >= ? AND Rate >= ? AND(City=?) ORDER BY Distance ";
        Values=[lat1,log1,log1,experience,rate,city];
    }
    if(city!=0 && sort==1 ){
        Q4=" SELECT *, ROUND((3956 * 2 * ASIN(SQRT( POWER(SIN((? - abs(dogsiters.Latitude)) * pi()/180 / 2), 2) + COS(? * pi()/180 ) * COS(abs(dogsiters.Latitude)* pi()/180)* POWER(SIN((? - dogsiters.Longtitude) * pi()/180 / 2), 2) ))),1) AS Distance FROM dogsiters WHERE Experience >= ? AND Rate >= ? AND(City=?) ORDER BY Rate DESC ";
        Values=[lat1,log1,log1,experience,rate,city];
    }
    else if(city!=0 && sort==2 ){
        Q4=" SELECT *, ROUND((3956 * 2 * ASIN(SQRT( POWER(SIN((? - abs(dogsiters.Latitude)) * pi()/180 / 2), 2) + COS(? * pi()/180 ) * COS(abs(dogsiters.Latitude)* pi()/180)* POWER(SIN((? - dogsiters.Longtitude) * pi()/180 / 2), 2) ))),1) AS Distance FROM dogsiters WHERE Experience >= ? AND Rate >= ? AND(City=?) ORDER BY Cost ASC";
        Values=[lat1,log1,log1,experience,rate,city];
    }
    // execute query
    sql.query(Q4,Values, (err, mysqlres)=>{
        if (err) {
            console.log("error in getting all dogsiters " + err);
            res.status(400).send({message:"error in getting all dogsiters " + err})
            return;
        }
        console.log("success... ");
        res.render('Results', {
            pple: mysqlres
        });
        return;
    });
    
};


// 3. check the city of the show:
function CheckCity(city){
    if(city==1){
        city = 'Beer Sheva';
     }
     else if(city==2){
         city = 'Tel Aviv';
     }
     else if(city==3){
         city = 'Jerusalem';
     }
     else{
         city = 'Haifa';
     }
     return city;
};
// 4. check the range km of the show:
function CheckRange(range){
    if(range==1){
        Distance=10;
    }
    else if(range==2){
        Distance=25;
    }
    else if(range==3){
        Distance=50;
    }
    else if(range==4){
        Distance=90000;
    }
    return Distance;
};

    const sendRank = (req, res)=>{
        if (!req.body) {
            res.status(400).send({message: "search cannot be empty"});
            return;        
        }
        console.log(req.body);
        if(req.body.rank==0){
            const f3="You have not selected a rank";
            const f4="";
            res.status(500).render('fail', {varFail1:f3 , varFail2:f4});
            return;
        }

        var id = req.body.id;
        var rank=req.body.rank;
        sql.query("UPDATE dogsiters SET Rate= (((Rate * countRaters) + ?) / (countRaters + 1)) , countRaters = countRaters+1 WHERE id= ?" , [rank,id] , (err, results, fields)=>{
            if (err) {
                console.log("ERROR IS: " + err);
                res.status(400).send("Somthing is wrong with query" + err);
                return;
            }
            if(results.length ==0){
                const f1="User is not found in database,";
                const f2="User Name or Password are incorrect.";
                res.status(200).render('fail', {varFail1:f1 , varFail2:f2});
                console.log("user doesnt exsist DB");
                return; 
            }
            console.log("User found");
            res.render('Search2');
            return;
        } );
}

module.exports = {createNewUser, Finduser,ShowAllDogiSiters,searchDogsitter,sendRank};