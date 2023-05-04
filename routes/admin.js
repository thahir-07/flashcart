var express = require('express');
var render=require("../app")
var router = express.Router();
var producthelper=require('../helpers/product-helpers');
const userHelpers = require('../helpers/user-helpers');
var proId




/* GET users listing. */
router.get('/', function(req, res, next) {
  producthelper.getAllProduct().then((products)=>{
    

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
    if(req.files)
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
router.get('/delete-products/:id',function(req,res){
 
   proId=req.params.id
  console.log(proId)
  producthelper.deleteProduct(proId).then((data )=>{
    res.redirect('/admin')
  })


})
router.get('/edit-products/:id', function(req, res) {
   proId=req.params.id
  
  producthelper.getProduct(proId).then((data)=>{
   res.render('admin/edit-products',{data,admin:true})
   
  })
  
});
router.post('/edit-products/:id',(req,res)=>{
  var data=req.body
  var id=req.params.id
 producthelper.updateProduct(data,id).then(async (resolve)=>{
  console.log(resolve)
  if( req.files)
 {            
   let image=req.files.image
   image.mv('./public/product-image/'+id+".jpg")
   
 }
  res.redirect('/admin')
  })
 
 
})

module.exports = router;


