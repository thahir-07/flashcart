var db = require('../config/connection')
var collections = require('../config/collections')
var bcrypt = require('bcrypt')
var objectId = require('mongodb').ObjectId
const Razorpay=require('razorpay')
var instance = new Razorpay({ key_id:'rzp_test_0lu74rFyib3blw', key_secret:'XKgnqx4zCMxB4ZMEbFWBgJ4h'})

module.exports = {
    doSignup: (userdata) => {
        return new Promise(async (resolve, reject) => {
            userdata.password = await bcrypt.hash(userdata.password, 10)
            db.get().collection(collections.USER_COLLECTION).insertOne(userdata).then((data) => {
                console.log(data)
                db.get().collection(collections.USER_COLLECTION).findOne({ _id: new objectId(data.insertedId) }).then((response) => {
                    resolve(response)
                })


            })
        })


    },
    doLogin: (data) => {
        return new Promise(async (resolve, reject) => {
            let loginstatus = false
            let response = {}
            let user = await db.get().collection(collections.USER_COLLECTION).findOne({ email: data.email })
            if (user) {

                bcrypt.compare(data.password, user.password).then((status) => {
                    if (status) {
                        response.status = true
                        response.user = user
                        resolve(response)
                    } else {
                        resolve({ status: false })
                    }


                })

            } else {
                resolve({ status: false })
            }


        })
    },
    cartCount: (userId) => {
        return new Promise(async (resolve, reject) => {
            let cartItemCount = 0
            let cartproducts = await db.get().collection(collections.CART_COLLECTION).findOne()
            if (cartproducts) {
                cartItemCount = cartproducts.products.length

            }

            resolve(cartItemCount)
        })
    },
    placeOrder: (order, products, total, user) => {
        return new Promise((resolve, reject) => {
            let stat = order.payementMethod === 'COD' ? 'placed' : 'pending'
            let orderObj = {
                deliveryDetails: {
                    date: new Date().toLocaleString(),
                    address: order.address,
                    pincode: order.pincode,
                    phone: order.phone
                },
                userId: new objectId(user),
                payementMethod: order.payementMethod,
                products: products,
                total: total,
                status: stat

            }
            db.get().collection(collections.ORDER_COLLECTION).insertOne(orderObj).then((response) => {
                db.get().collection(collections.CART_COLLECTION).deleteOne({ user: new objectId(user) })
                    console.log(response)
                    resolve(response.insertedId)

                
            })

        })
    },
    getOrderDetails: (userId) => {
        return new Promise(async (resolve, reject) => {
            let orders = await db.get().collection(collections.ORDER_COLLECTION).find({ userId: new objectId(userId) }).toArray()
            resolve(orders)
        })
    },
    getOrderProduct: (id) => {
        return new Promise(async (resolve, reject) => {
            let orderItems = await db.get().collection(collections.ORDER_COLLECTION).aggregate([
                {
                    $match: { _id: new objectId(id) }
                },
                {
                    $unwind: '$products'
                },
                {
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity'
                    }
                },
                {
                    $lookup: {
                        from: collections.PRODUCT_COLLECTION,
                        localField: 'item',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $project: {
                        item: 1,
                        quantity: 1,
                        product: {
                            $arrayElemAt: ['$product', 0]
                        }
                    }
                }

            ]).toArray()
            console.log(orderItems)
            resolve(orderItems)


        })
    },
    generateRazorpay:(orderId,total)=>{
        console.log('total amount.......'+total)
        return new Promise((resolve,reject)=>{
          var options={
                amount:total*100,
                currency: "INR",
                receipt:''+orderId
            

              }
              instance.orders.create(options,(err,order)=>{
                console.log(order)
                console.log(err)
                resolve(order)

              })
          
        })

    },
    verifyPayement:(payementDetails)=>{
        return new Promise((resolve,reject)=>{
            const crypto=require('crypto')
            var hmac=crypto.createHmac('sha256','XKgnqx4zCMxB4ZMEbFWBgJ4h')
            hmac.update(payementDetails['payement[razorpay_order_id]']+'|'+payementDetails['payement[razorpay_payment_id]'])
            hmac=hmac.digest('hex')
            console.log(hmac)
            console.log(payementDetails['payement[razorpay_signature]'])
            if(hmac==payementDetails['payement[razorpay_signature]'])
            {
               
                resolve()

            }else{
                
                reject()
            }

        })
    },
    changeOrderStatus:(orderId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.ORDER_COLLECTION).updateOne({_id:new objectId(orderId)},{$set:{status:'placed'}}).then((response)=>{
                resolve()
            })

        })
    }
}
