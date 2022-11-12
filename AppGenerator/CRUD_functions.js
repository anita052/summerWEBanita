const sql = require('./DB/db');
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
    sql.query("INSERT INTO users SET ?", NewUser, (err, mysqlres)=>{
        if (err) {
            const f1= "/register"
            const f2 = "Register";
            const f3="User is already exist";
            const f4="";
            res.status(400).render('fail', {varFail1:f1 ,varFail2:f2 , varFail3:f3,varFail4:f4});
            return; 
        }
        res.render("signin");
        return;
    } )

}
    //find user from database
    const Finduser = (req, res,next)=>{
    if (!req.body) {
        res.status(400).send({message: "search cannot be empty"});
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
            const f1="/SignIn";
            const f2 = "Sign in";
            const f3="User is not found ,";
            const f4="User Name or Password are incorrect.";
            res.status(400).render('fail', {varFail1:f1 ,varFail2:f2, varFail3:f3,varFail4:f4});
            return; 
        }
        const email=req.body.email;

        res.render('Search2');
        return;
    } );
};


//dog sitter table filterd
const searchDogsitter = (req,res)=>{
    var Q1;
    var Values=[];
    var log1=req.body.GeoLong;
    var lat1=req.body.GeoLat;
    var rate=req.body.rankFilter;
    var city=req.body.city;
    var f1= "/Search";
    var f2 = "Search";
    if(city!=0){
        city=CheckCity(city);
    }
    var experience=req.body.expFilter;
    var sort=req.body.sort;

    // user didnt choose dog sitter rate and experience 
    if(rate==undefined && experience == undefined){
        const f3="No Dogsitter rate and experirnce fielfd was entered";
        const f4="You must choose Dogsitter rate and experirnce";
        res.status(400).render('fail', {varFail1:f1 ,varFail2:f2, varFail3:f3 , varFail4 :f4});
        return; 
    }
    // user didnt choose dog sitter rate 
    if(rate==undefined){
        const f3="No Dogsitter rate field was entered";
        const f4="You must choose Dogsitter rate ";
        res.status(400).render('fail', {varFail1:f1 ,varFail2:f2, varFail3:f3 , varFail4 :f4});
        return; 
    }
    // user didnt choose dog sitter experience
    if(experience == undefined){
        const f3="No Dogsitter experirnce field was entered";
        const f4="You must choose Dogsitter experirnce";
        res.status(400).render('fail', {varFail1:f1 ,varFail2:f2, varFail3:f3 , varFail4 :f4});
        return; 
    }
     // user choose all cities and sort by distance
    if(city==0 && sort==0 ){
        Q1=" SELECT *, ROUND((3956 * 2 * ASIN(SQRT( POWER(SIN((? - abs(dogsiters.Latitude)) * pi()/180 / 2), 2) + COS(? * pi()/180 ) * COS(abs(dogsiters.Latitude)* pi()/180)* POWER(SIN((? - dogsiters.Longtitude) * pi()/180 / 2), 2) ))),1) AS Distance FROM dogsiters WHERE Experience >= ? AND Rate >= ? ORDER BY Distance ";
        Values=[lat1,log1,log1,experience,rate];
    }
    // user choose all cities and sort by Rank
    if(city==0 && sort==1){
        Q1=" SELECT *, ROUND((3956 * 2 * ASIN(SQRT( POWER(SIN((? - abs(dogsiters.Latitude)) * pi()/180 / 2), 2) + COS(? * pi()/180 ) * COS(abs(dogsiters.Latitude)* pi()/180)* POWER(SIN((? - dogsiters.Longtitude) * pi()/180 / 2), 2) ))),1) AS Distance FROM dogsiters WHERE Experience >= ? AND Rate >= ? ORDER BY Rate DESC ";
        Values=[lat1,log1,log1,experience,rate];
    }
    // user choose all cities and sort by Price
    if(city==0 && sort==2){   
        Q1=" SELECT *, ROUND((3956 * 2 * ASIN(SQRT( POWER(SIN((? - abs(dogsiters.Latitude)) * pi()/180 / 2), 2) + COS(? * pi()/180 ) * COS(abs(dogsiters.Latitude)* pi()/180)* POWER(SIN((? - dogsiters.Longtitude) * pi()/180 / 2), 2) ))),1) AS Distance FROM dogsiters WHERE Experience >= ? AND Rate >= ? ORDER BY Cost ASC ";
       Values=[lat1,log1,log1,experience,rate];
    }
    // user choose specific city and sort by distance
    if(city!=0 && sort==0 ){
        Q1=" SELECT *, ROUND((3956 * 2 * ASIN(SQRT( POWER(SIN((? - abs(dogsiters.Latitude)) * pi()/180 / 2), 2) + COS(? * pi()/180 ) * COS(abs(dogsiters.Latitude)* pi()/180)* POWER(SIN((? - dogsiters.Longtitude) * pi()/180 / 2), 2) ))),1) AS Distance FROM dogsiters WHERE Experience >= ? AND Rate >= ? AND(City=?) ORDER BY Distance ";
        Values=[lat1,log1,log1,experience,rate,city];
    }
    // user choose specific city and sort by Rank 
    if(city!=0 && sort==1 ){
        Q1=" SELECT *, ROUND((3956 * 2 * ASIN(SQRT( POWER(SIN((? - abs(dogsiters.Latitude)) * pi()/180 / 2), 2) + COS(? * pi()/180 ) * COS(abs(dogsiters.Latitude)* pi()/180)* POWER(SIN((? - dogsiters.Longtitude) * pi()/180 / 2), 2) ))),1) AS Distance FROM dogsiters WHERE Experience >= ? AND Rate >= ? AND(City=?) ORDER BY Rate DESC ";
        Values=[lat1,log1,log1,experience,rate,city];
    }
    // user choose specific city and sort by Price
    else if(city!=0 && sort==2 ){
        Q1=" SELECT *, ROUND((3956 * 2 * ASIN(SQRT( POWER(SIN((? - abs(dogsiters.Latitude)) * pi()/180 / 2), 2) + COS(? * pi()/180 ) * COS(abs(dogsiters.Latitude)* pi()/180)* POWER(SIN((? - dogsiters.Longtitude) * pi()/180 / 2), 2) ))),1) AS Distance FROM dogsiters WHERE Experience >= ? AND Rate >= ? AND(City=?) ORDER BY Cost ASC";
        Values=[lat1,log1,log1,experience,rate,city];
    }
    // execute query
    sql.query(Q1,Values, (err, mysqlres)=>{
        if (err) {
            console.log("error in getting all dogsiters " + err);
            res.status(500).send({message:"error in getting all dogsiters " + err})
            return;
        }
        if(mysqlres.length ==0){
            const f1="/Search";
            const f2 = "Search";
            const f3="No matching results were found for your search ,";
            const f4="Try changing your search.";
            res.status(400).render('fail', {varFail1:f1 ,varFail2:f2, varFail3:f3,varFail4:f4});
            return; 
        }
        res.render('Results', {
            pple: mysqlres
        });
        return;
    });
};

//  check the city (help function) :
function CheckCity(city){
    if(city==1){
        city = 'Beer-Sheva';
     }
     else if(city==2){
         city = 'Tel-Aviv';
     }
     else if(city==3){
         city = 'Jerusalem';
     }
     else{
         city = 'Haifa';
     }
     return city;
};

// update dogsitter rank
    const sendRank = (req, res)=>{
        var id = req.body.id;
        var rank=req.body.rank;
        sql.query("UPDATE dogsiters SET Rate= (((Rate * countRaters) + ?) / (countRaters + 1)) , countRaters = countRaters+1 WHERE id= ?" , [rank,id] , (err, results, fields)=>{
            if (err) {
                console.log("ERROR IS: " + err);
                res.status(400).send("Somthing is wrong with query" + err);
                return;
            }
            return;
        } );
}

module.exports = {createNewUser, Finduser,searchDogsitter,sendRank};