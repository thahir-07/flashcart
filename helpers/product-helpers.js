var db=require('../config/connection')
var collections=require('../config/collections')
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
        




    }
}