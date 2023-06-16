module.exports={
    product_check:(product,item,options)=>{
        if(product.category==item)
            return options.fn(product)
        else
            return options.inverse(product)
    }
}