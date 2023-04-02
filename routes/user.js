var express = require('express');
var router = express.Router();
var db = require('../config/connection')
var collections = require('../config/collections')
var producthelper = require('../helpers/product-helpers')
var userhelpers=require('../helpers/user-helpers')


/* GET home page. */
router.get('/', function (req, res, next) {
  let user=req.session.user
  console.log(user)
  producthelper.getAllProduct().then((product) => {
    
    res.render('user/view-products', { product, admin: false ,user})
  })
})

router.get('/login',function(req,res){
  res.render('user/user-login',{})
})

router.get('/signup',function(req,res){
  res.render('user/user-signup',{})
})
router.post('/signup',function(req,res){
  userhelpers.doSignup(req.body).then((response)=>{
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
      res.redirect('/login')
    }

  })
})
router.get('/logout',function(req,res){
  req.session.destroy()
  res.redirect('/')
})
module.exports = router


