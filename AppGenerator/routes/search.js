var express = require('express');
var router = express.Router();
const CRUD = require("../CRUD_functions"); 

/* GET home page. */
router.get('/', function(req, res, next) {
    // CRUD.calculateLocation(req, res);
    CRUD.tableCalculate(req,res,next);
    res.render("Search.html");
    console.log("searchP");
    
});


module.exports = router;