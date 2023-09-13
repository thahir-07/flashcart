module.exports={
    product_check:(product,item,options)=>{
        if(product.subCategory==item ||product.productCategory==item)
            return options.fn(product)
        else
            return options.inverse(product)
    },

    
    check:(orders,status,options)=>{
        if(orders.status!=status){
            return options.fn(orders)
        }else{
            return options.inverse(orders)
        }
    },
    repeat:(times, options)=>{
        let result = '';
  for (let i = 0; i < times; i++) {
    result += options.fn({value:i + 1});
  }
  return result;
    }
        
        
}