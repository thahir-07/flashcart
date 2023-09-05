var objectId = require('mongodb').ObjectId
module.exports={
    product_check:(product,item,options)=>{
        if(product.subCategory==item ||product.productCategory==item)
            return options.fn(product)
        else
            return options.inverse(product)
    },
    date_check:(orders,id,options)=>{
        for(i in orders){
            console.log("working.............................")
            if( id==i._id)
            return options.fn(i)
        else
            return options.inverse(i)
    }
        }
        
}