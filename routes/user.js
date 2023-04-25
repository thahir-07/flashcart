var express = require('express');
var router = express.Router();
var db = require('../config/connection')
var collections = require('../config/collections')
var producthelper = require('../helpers/product-helpers')
var userhelpers = require('../helpers/user-helpers');
var productHelpers = require('../helpers/product-helpers');
const { handlebars } = require('hbs');
let user = null
let cartItemCount=0


/* GET home page. */
router.get('/', async function (req, res, next) {
  user = req.session.user
  
  if(user){
    cartItems=await productHelpers.getCartProducts(req.session.user._id)
    cartItemCount=cartItems.length
    console.log(cartItemCount.length)
  } 
  producthelper.getAllProduct().then((product) => {
  res.render('user/view-products', { product, admin: false, user, cartItemCount})
  })
})

router.get('/login', function(req, res) {
  if (req.session.loggedIn) {
    res.redirect('/')

  } else {

    res.render('user/user-login', { logerr: req.session.loginErr })
    req.session.loginErr = false


  }
})


router.get('/signup', function (req, res) {
  res.render('user/user-signup')
})
router.post('/signup', function (req, res) {
  userhelpers.doSignup(req.body).then((response) => {
    req.session.loggedIn = true
    req.session.user = response
    user = req.session.user
    res.redirect('/login')
  })
})
router.post('/login', function (req, res) {


  userhelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')
    } else {
      req.session.loginErr = "Invalid Email or Password"

      res.redirect('/login')
    }

  })
})
router.get('/logout', function (req, res) {
  req.session.destroy()
  res.redirect('/')
})
router.get('/cart', async function (req, res) {
  if (req.session.user) {
   
      cartItems=await productHelpers.getCartProducts(req.session.user._id)
      cartItemCount=cartItems.length
      
   
    producthelper.getCartProducts(req.session.user._id).then((products) => {
      productHelpers.totalAmount(req.session.user._id).then((response)=>{
        res.render('user/user-cart',{products,user,cartItemCount})

      })
      
     
    })

  }else{
    res.redirect('/login')

  }
}
)

function verifyLogin(req, res, next) {
  let user = req.session.user
  if (req.session.loggedIn)
    res.render('user/user-cart', { user })
  else
    res.render('user/user-login')
  next()
}

router.get('/addtocart/:id',(req, res) => {
  var id = req.params.id
  if (req.session.user) {
   
    producthelper.addToCart(id, req.session.user._id).then((response) => {
      res.json(response)
    })

    }else{
      
      res.redirect('/login')
    }


  }
 
)
router.get('/remove/:id',(req,res)=>{
  console.log(req.session.user._id,req.params.id)
  producthelper.deleteFromCart(req.session.user._id,req.params.id)
  res.redirect('/cart')

})
router.post('/change-product-quantity',(req,res)=>{
 
 producthelper.change_product_quantity(req.body.cart,req.body.product,req.body.count,req.body.quantity,user._id).then((response)=>{
 
  res.json(response)
 })
})
router.get('/place-order',(req,res)=>{
  res.render('user/place-order')
})
module.exports = router
