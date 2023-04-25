function addToCart(proId){
    $.ajax({
        url:"/addtocart/"+proId,
        method:'get',
        success:(response)=>{
           
               if(response.response!='increment'){
                let count=$('#cart-count').html()
                count=parseInt(count)+1
                $('#cart-count').html(count)
                }
              else
              {
                alert('item already exist in cart')
              }
           

        }
    })

}
function changeQuantity(cartId,proId,count){
   let quantity=parseInt( document.getElementById(proId).innerHTML)
    
    $.ajax({
        url:'/change-product-quantity',
        data:{
            cart:cartId,
            product:proId,
            count:count,
            quantity:quantity
        },
        method:'post',
        success:(response)=>{
            count=parseInt(count)
            console.log(response)
            if(response.productRemoved){
                alert('product removed from cart')
                location.reload()

            }else
               {
                 if(count==1){
                
                   document.getElementById(proId).innerHTML=quantity+1
                    
                }
                else{
                   
                    quantity=quantity-1
                    document.getElementById(proId).innerHTML=quantity                }
          }
          

        }
    })

}