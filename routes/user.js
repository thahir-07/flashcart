var express = require('express');
var router = express.Router();
var db=require('../config/connection')
var collections=require('../config/collections')
var producthelper=require('../helpers/product-helpers')


/* GET home page. */
router.get('/', function (req, res, next) {
  
producthelper.getAllProduct().then((product)=>{
  console.log(product)
  res.render('index',{product,admin:false})


})
    
     } )


module.exports = router


