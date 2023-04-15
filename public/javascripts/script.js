function addToCart(proId){
    $.ajax({
        url:"/addtocart/"+proId,
        method:'get',
        success:(response)=>{
            
            if(response){
               if(response.response!='increment'){
                let count=$('#cart-count').html()
                count=parseInt(count)+1
                $('#cart-count').html(count)
            }
               
            }
           

        }
    })

}
function changeQuantity(cartId,proId,count){
    
    $.ajax({
        url:'/change-product-quantity',
        data:{
            cart:cartId,
            product:proId,
            count:count
        },
        method:'post',
        success:(response)=>{
            count=parseInt(count)
                if(count===1){
                    let quantity=parseInt( $('#count').html())
                    console.log(count)
                    quantity=quantity+1
                    $('#count').html(quantity)
                }
                else{
                    let quantity=parseInt( $('#count').html())
                    quantity=quantity-1
                    $('#count').html(quantity)
                }
          
          

        }
    })

}