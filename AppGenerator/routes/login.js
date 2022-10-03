var express = require('express');
var router = express.Router();
const CRUD = require("../CRUD_functions"); 


router.post('/', function(req, res, next) {
    // var userEmail = req.body.email;
    // var userPassword = req.body.password;
    CRUD.Finduser(req, res);
    // res.render("/search");

   
});


module.exports = router;
