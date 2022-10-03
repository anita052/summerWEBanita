// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

///
const express=require('express');
const app=express();
app.listen(3000, () =>console.log('listning in 3000'));
app.use(express.static('nision'));
