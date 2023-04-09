var db=require('../config/connection')
var collections=require('../config/collections')
var ObjectId=require('mongodb').ObjectId
module.exports={
     addProduct:(product,callback)=>{
        db.get().collection(collections.PRODUCT_COLLECTION).insertOne(product).then((data)=>{
            callback(data.insertedId)
        })
    
     },
       getAllProduct: ()=>{
        return new Promise(async(resolve,reject)=>{
            let product= await db.get().collection(collections.PRODUCT_COLLECTION).find().toArray() 
            resolve(product)

        })
    
    },
    deleteProduct:(proId)=>{
        return new Promise((resolve,reject)=>{
             db.get().collection(collections.PRODUCT_COLLECTION).deleteOne({_id:new ObjectId(proId)}).then((response)=>{
                console.log(response)
                resolve(response)

            })
        })
    },
    getProduct: (proId)=>{
        return new Promise(async(resolve,reject)=>{
            let product= await db.get().collection(collections.PRODUCT_COLLECTION).findOne({_id:new ObjectId(proId)})

            resolve(product)


        })
    
    },
    updateProduct:(data,proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTION).updateOne({_id:new ObjectId(proId)},{$set:
                {name:data.name,
                category:data.category,
                description:data.description,
                price:data.price}
                }).then((response)=>{
                resolve(response)
            })
        })

    },
    addToCart:(proId,userId)=>{
        return new Promise(async (resolve,reject)=>{
            let userCart=await db.get().collection(collections.CART_COLLECTION).findOne({user:new ObjectId(userId)})
            
            if(userCart){
                db.get().collection(collections.CART_COLLECTION).updateOne(
                    {user:new ObjectId(userId)},
                    {
                        $push:{products:new ObjectId(proId)}
                    }
                    ).then((response)=>{
                        console.log("cart updated")
                        resolve(response)

                    })
               
                

            }
            else{
                let cardObj={
                    user:new ObjectId(userId),
                    products:[new ObjectId(proId)]
                }
                db.get().collection(collections.CART_COLLECTION).insertOne(cardObj).then((response)=>{
                    console.log("user cart created")
                   
                    resolve(response)
                })
            }
          
        })
        

        

    },/*getCartProducts:(userId)=>{
        return new Promise(async(resolve,reject)=>{
       let productsValues=await db.get().collection(collections.CART_COLLECTION).findOne({user:new ObjectId(userId)},{_id:0})
       console.log("products are.......")
       console.log(productsValues.products[0])
       let productDetails=[]
       let length=productsValues.products.length
       for(i=0;i<length;i++){

         productDetails.push(await db.get().collection(collections.PRODUCT_COLLECTION).findOne({_id:new ObjectId(productsValues.products[i])}))
       }
       console.log("after array iteration")
       console.log(productDetails)
       resolve(productDetails)
       
    })
   
}*/
//above code is written without aggregate and code working properly
getCartProducts:((userId)=>{
    return new Promise(async(resolve,reject)=>{
      let cartItems=await db.get().collection(collections.CART_COLLECTION).aggregate([
            {
                $match:{user:new ObjectId(userId)}
            },
            {
                $lookup:{
                    from:collections.PRODUCT_COLLECTION,
                    let:{productList:'$products'},
                    pipeline:[
                        {
                            $match:{
                                $expr:{
                                    $in:['$_id','$$productList']
                                }
                            }
                        }
                    ],
                    as:'cartItems'

                }
            }
        ]).toArray()
        
        resolve(cartItems[0].cartItems)
    }
   
    )

})
}