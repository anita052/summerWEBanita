var express = require('express');
var router = express.Router();
const CRUD = require("../CRUD_functions"); 

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("register.html");
    console.log("dsd")

});
router.post('/submit', function(req, res, next) {
    CRUD.createNewUser(req, res);
});

module.exports = router;