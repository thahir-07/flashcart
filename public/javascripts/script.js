
$(function(){
$('#productTable').DataTable()

})
$(function(){
    $('#user').DataTable()
    
    })
function count(id){
    console.log("count function called")
   var count=document.getElementById(id).innerHTML
   document.getElementById(id).innerHTML=parseInt(count)+1



}
$("#checkout-form").submit((e) => {
    console.log('ajaxxxxxxxxxxxxxxxxxxxxxxx')
    e.preventDefault()
    console.log(e)
    $.ajax({
        url: '/place-order',
        method: 'post',
        data: $('#checkout-form').serialize(),
        success: (response) => {
            if (response.status === 'COD') {
                location.href = '/order-success'

            } else {
                razorpayPayement(response)
            }

        }

    })
})
function razorpayPayement(order) {
    var options = {
        "key": "rzp_test_0lu74rFyib3blw", // Enter the Key ID generated from the Dashboard
        "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Flashcart", //your business name
        "description": "Test Transaction",
        "image": '/project-images/flashcart.png',
        "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": (response) => {
            verifyPayement(response, order)

        },
        //"callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
        "prefill": {
            "name": "Thahir", //your customer's name
            "email": "abuthahircoorg@gmail.com",
            "contact": "8277906114"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    if(navigator.onLine){
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }
    
}
function verifyPayement(payement, order) {
    console.log('verify Payement function called')
    $.ajax({
        url: '/verify-payement',
        data: {
            payement,
            order
        },
        method: 'post',
        success: (response) => {
            console.log('success called')
            if (response.status) {
                location.href = '/order-success'
            } else {
                alert('payement failed')
            }

        }
    })

}
function addToCart(proId,user){
       $.ajax({
            url: "/addtocart/" + proId,
            method: 'get',
            success: (response) => {
                
                    if (response.response != 'increment') {
                        let count = $('#cart-count').html()
                        count = parseInt(count) + 1
                        $('#cart-count').html(count)
                    }
                    else {
                        
                            customAlert.style.display = "flex";
                            

                       
                    }
    
                
            }
        })
   

}
function changeQuantity(cartId, proId, count) {
    let quantity = parseInt(document.getElementById(proId).innerHTML)

    $.ajax({
        url: '/change-product-quantity',
        data: {
            cart: cartId,
            product: proId,
            count: count,
            quantity: quantity
        },
        method: 'post',
        success: (response) => {
            count = parseInt(count)
            console.log(response)
            if (response.response.productRemoved) {
                location.reload()

            } else {
                if (count == 1) {

                    document.getElementById(proId).innerHTML = quantity + 1

                }
                else {

                    quantity = quantity - 1
                    document.getElementById(proId).innerHTML = quantity
                }
            }

            $('#total').html(response.total)
        }
    })
}
