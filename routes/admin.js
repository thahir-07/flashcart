var express = require('express');
var render = require("../app")
var router = express.Router();
var producthelper = require('../helpers/product-helpers');
const userHelpers = require('../helpers/user-helpers');
const fs = require('fs')
var proId




/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.session.AdminLoggedIn) {
    producthelper.getAllProduct().then((products) => {
      var nav='allproducts'
      res.render('admin/view-products', { products, admin: true,nav })
    })

  } else {
    var nav='allproducts'
    res.render('admin/admin-login', { admin: true,nav })

  }

})


router.post('/admin-page', (req, res) => {
  console.log("admin page")
  console.log(req.body)
  userHelpers.checkAdminLogin(req.body).then((response) => {
    producthelper.getAllProduct().then((products) => {
      res.render('admin/view-products', { products, admin: true })
    })
    req.session.admin = response
    req.session.AdminLoggedIn = true


  }).catch(() => {
    req.session.adminLoginErr = "invalid user name or password"
    res.render('admin/admin-login', { err: req.session.adminLoginErr })


  })


})
router.get('/add-products', function (req, res) {
  res.render('admin/add-product', { admin: true })

});
router.get('/orders', async function (req, res) {
  let orders = await userHelpers.getAllOrderDetails()
  console.log(orders)
  var nav='orders'
  res.render('admin/all-orders', { orders, admin: true,nav })

});
router.get('/users', async function (req, res) {
  var users = await userHelpers.allUsers()
  var nav='users'
  res.render('admin/all-user', { users, admin: true ,nav})


});

router.get('/view-order-products/:id', async (req, res) => {
  console.log("id from admin panel", req.params.id)
  console.log(req.params.id)
  let products = await userHelpers.getProduct(req.params.id)
  res.render('admin/view-order-products', { products, admin: true,id:req.params.id})
})

router.post('/add-products', function (req, res) {
  console.log(req.body)
  producthelper.addProduct(req.body, (id) => {
    console.log(req.files)
    if (req.files) {
      let i = 0
      for (var file in req.files) {
        var img = req.files[file]
          console.log(file)
        i += 1
        if (i == 1) {
          img.mv('./public/product-image/' + id + '.jpg', (err, done) => {
            if (!err) {
              console.log("file added successfully")
              console.log(img)
            }
            else {
              console.log(err)
            }
          })
        } else {
          
          img.mv('./public/product-image/' + id + i + '.jpg', (err, done) => {
            if (!err) {
              console.log("file added successfully")
              console.log(img)
            }
            else {
              console.log(err)
            }
          })
        }
      }

    }

  })
  res.render('admin/add-product', { admin: true })

});
router.get('/delete-products/:id', function (req, res) {

  proId = req.params.id
  console.log(proId)
  producthelper.deleteProduct(proId).then((data) => {
    var imgPath
    for (var i = 1; i <= 4; i++) {
      if (i == 1) {
        imgPath = './public/product-image/' + proId + '.jpg'
      } else
        imgPath = './public/product-image/' + proId + i + '.jpg'
      fs.unlink(imgPath, (err) => {
        if (err) {
          console.log('error found while deleting file' + imgPath)
        } else {
          console.log('file deleted successfully' + imgPath)
        }
      });
    }
    res.redirect('/admin')
  })


})
router.get('/edit-products/:id', function (req, res) {
  proId = req.params.id

  producthelper.getProduct(proId).then((data) => {
    res.render('admin/edit-products', { data, admin: true })

  })

});
router.post('/edit-products/:id', (req, res) => {
  var data = req.body
  var id = req.params.id
  producthelper.updateProduct(data, id).then(async (resolve) => {
    console.log(resolve)
    if (req.files) {
      if(req.files.image1){
       var img=req.files.image1
       img.mv('./public/product-image/' + id + '.jpg')
      }
       if(req.files.image2){
        var img=req.files.image2
       img.mv('./public/product-image/' + id +'2'+ '.jpg')
      }
      if(req.files.image3){
        var img=req.files.image3
       img.mv('./public/product-image/' + id +'3'+ '.jpg')
      }
       if(req.files.image4){
        var img=req.files.image4
       img.mv('./public/product-image/' + id +'4'+ '.jpg')
      }
      

    }
    res.redirect('/admin')
  })


})
router.get('/manage-ads',(req,res)=>{
  var nav='manage-ads'
  res.render('admin/manage-ads',{admin: true,nav})
})
router.post('/update-ads',(req,res)=>{
  if(req.files){
    if(req.files.ad1){
      var ad_img=req.files.ad1
      ad_img.mv('./public/project-images/ad1.jpg')
    }
    if(req.files.ad2){
      var ad_img=req.files.ad2
      ad_img.mv('./public/project-images/ad2.jpg')
    }
    if(req.files.ad3){
      var ad_img=req.files.ad3
      ad_img.mv('./public/project-images/ad3.jpg')
    }
  }
  res.render('admin/manage-ads',{admin: true})
})

router.get('/update-status',async (req,res)=>{
 var orderId=req.query.id
 console.log(typeof orderId)
 producthelper.getOrder(orderId).then((order)=>{
  console.log(order)
  res.render('admin/status-update', { admin: true, order})
 })
})
router.post('/update-status',(req,res)=>{
  var values = req.body
  console.log(values)
  var update=producthelper.updateStatus(values).then((response)=>{
    console.log(response)
    res.redirect('/admin/orders')
  })
})
module.exports = router;


