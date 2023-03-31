var express = require('express');
var render=require("../app")
var router = express.Router();
var producthelper=require('../helpers/product-helpers')


/* GET users listing. */
router.get('/', function(req, res, next) {
  producthelper.getAllProduct().then((products)=>{
    console.log(products)
    res.render('admin/view-products',{products,admin:true})

  })

  })
  
  

router.get('/add-products', function(req, res) {
  res.render('admin/add-product',{admin:true})
  
});
router.get('/orders', function(req, res) {
  res.render('admin/view-products',{admin:true})
  
});
router.get('/users', function(req, res) {
  res.render('admin/view-products',{admin:true})
  
});

router.post('/add-products', function(req, res) {
  producthelper.addProduct(req.body,(id)=>{
    var img=req.files.image
    img.mv('./public/product-image/'+id+'.jpg',(err,done)=>{
      if(!err)
      {
        res.render('admin/add-product',{admin:true})
      }
      else{
        console.log(err)
      }
    })
    
  })
  
});

module.exports = router;
