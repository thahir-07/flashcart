var express = require('express');
var router = express.Router();
let products = [{
  name: "iphone 14",
  category: "smart phone",
  description: " latest pill notch display with face id and more features",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/m/j/j/-original-imagnvvwvzyhfvx9.jpeg?q=90"
},
{
  name: "samsung s21",
  category: "smart phone",
  description: " latest good looking design with 100x zoom rear camera",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/3/l/x/-original-imaghmtcmxwgypsk.jpeg?q=90"
},{
  name: "moto g fushion",
  category: "smart phone",
  description: " latest good looking design with curve display",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/a/8/a/-original-imagbwx4ahgqxgg9.jpeg?q=90"
},{
  name: "iphone 14",
  category: "smart phone",
  description: " latest pill notch display with face id and more features",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/m/j/j/-original-imagnvvwvzyhfvx9.jpeg?q=90"
},
{
  name: "samsung s21",
  category: "smart phone",
  description: " latest good looking design with 100x zoom rear camera",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/3/l/x/-original-imaghmtcmxwgypsk.jpeg?q=90"
},{
  name: "moto g fushion",
  category: "smart phone",
  description: " latest good looking design with curve display",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/a/8/a/-original-imagbwx4ahgqxgg9.jpeg?q=90"
},{
  name: "iphone 14",
  category: "smart phone",
  description: " latest pill notch display with face id and more features",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/m/j/j/-original-imagnvvwvzyhfvx9.jpeg?q=90"
},
{
  name: "samsung s21",
  category: "smart phone",
  description: " latest good looking design with 100x zoom rear camera",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/3/l/x/-original-imaghmtcmxwgypsk.jpeg?q=90"
},{
  name: "moto g fushion",
  category: "smart phone",
  description: " latest good looking design with curve display",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/a/8/a/-original-imagbwx4ahgqxgg9.jpeg?q=90"
},{
  name: "iphone 14",
  category: "smart phone",
  description: " latest pill notch display with face id and more features",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/m/j/j/-original-imagnvvwvzyhfvx9.jpeg?q=90"
},
{
  name: "samsung s21",
  category: "smart phone",
  description: " latest good looking design with 100x zoom rear camera",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/3/l/x/-original-imaghmtcmxwgypsk.jpeg?q=90"
},{
  name: "moto g fushion",
  category: "smart phone",
  description: " latest good looking design with curve display",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/a/8/a/-original-imagbwx4ahgqxgg9.jpeg?q=90"
},{
  name: "iphone 14",
  category: "smart phone",
  description: " latest pill notch display with face id and more features",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/m/j/j/-original-imagnvvwvzyhfvx9.jpeg?q=90"
},
{
  name: "samsung s21",
  category: "smart phone",
  description: " latest good looking design with 100x zoom rear camera",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/3/l/x/-original-imaghmtcmxwgypsk.jpeg?q=90"
},{
  name: "moto g fushion",
  category: "smart phone",
  description: " latest good looking design with curve display",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/a/8/a/-original-imagbwx4ahgqxgg9.jpeg?q=90"
},{
  name: "iphone 14",
  category: "smart phone",
  description: " latest pill notch display with face id and more features",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/m/j/j/-original-imagnvvwvzyhfvx9.jpeg?q=90"
},
{
  name: "samsung s21",
  category: "smart phone",
  description: " latest good looking design with 100x zoom rear camera",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/3/l/x/-original-imaghmtcmxwgypsk.jpeg?q=90"
},{
  name: "moto g fushion",
  category: "smart phone",
  description: " latest good looking design with curve display",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/a/8/a/-original-imagbwx4ahgqxgg9.jpeg?q=90"
},{
  name: "iphone 14",
  category: "smart phone",
  description: " latest pill notch display with face id and more features",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/m/j/j/-original-imagnvvwvzyhfvx9.jpeg?q=90"
},
{
  name: "samsung s21",
  category: "smart phone",
  description: " latest good looking design with 100x zoom rear camera",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/3/l/x/-original-imaghmtcmxwgypsk.jpeg?q=90"
},{
  name: "moto g fushion",
  category: "smart phone",
  description: " latest good looking design with curve display",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/a/8/a/-original-imagbwx4ahgqxgg9.jpeg?q=90"
},{
  name: "iphone 14",
  category: "smart phone",
  description: " latest pill notch display with face id and more features",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/m/j/j/-original-imagnvvwvzyhfvx9.jpeg?q=90"
},
{
  name: "samsung s21",
  category: "smart phone",
  description: " latest good looking design with 100x zoom rear camera",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/3/l/x/-original-imaghmtcmxwgypsk.jpeg?q=90"
},{
  name: "moto g fushion",
  category: "smart phone",
  description: " latest good looking design with curve display",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/mobile/a/8/a/-original-imagbwx4ahgqxgg9.jpeg?q=90"
} ]

/* GET home page. */
router.get('/', function (req, res, next) {
 
  res.render('index', {products,admin:false});
});


module.exports = router


