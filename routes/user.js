var express = require('express');
var router = express.Router();
var db = require('../config/connection')
var collections = require('../config/collections')
var producthelper = require('../helpers/product-helpers')
var userhelpers=require('../helpers/user-helpers')
let user=null



/* GET home page. */
router.get('/', function (req, res, next) {
  user=req.session.user
  
  producthelper.getAllProduct().then((product) => {
    
    res.render('user/view-products', { product, admin: false ,user})
  })
})

router.get('/login',function(req,res){
  if(req.session.loggedIn)
  {
    res.redirect('/')
  
  }else{
    
    res.render('user/user-login',{logerr:req.session.loginErr})
    req.session.loginErr=false


  }
})
  

router.get('/signup',function(req,res){
  res.render('user/user-signup')
})
router.post('/signup',function(req,res){
  userhelpers.doSignup(req.body).then((response)=>{
    req.session.loggedIn=true
    req.session.user=response
    user=req.session.user
    res.redirect('/login')
  })
})
router.post('/login',function(req,res){

  
  userhelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      req.session.loginErr="Invalid Email or Password"
      
      res.redirect('/login')
    }

  })
})
router.get('/logout',function(req,res){
  req.session.destroy()
  res.redirect('/')
})
router.get('/cart',verifyLogin,function(req,res){

})

function verifyLogin(req,res,next){
  let user=req.session.user
  if(req.session.loggedIn)
     res.render('user/user-cart',{user})
  else
  res.render('user/user-login')
next()
}
router.get('/addtocart/:id',verifyLogin,(req,res)=>{
  var id=req.params.id
  if(req.session.loggedIn){
    producthelper.addToCart(id,req.session.user._id).then((resolve)=>{
      res.render('user/add-to-cart')

    })
    

  } 
  else{
    res.redirect('/login')
  }
 


})
module.exports = router


