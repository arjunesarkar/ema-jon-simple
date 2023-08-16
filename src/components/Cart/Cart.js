import { text } from '@fortawesome/fontawesome-svg-core';
import React from 'react';

const Cart = (props) => {
    const cart = props.cart ;
    // const total = cart.reduce( (total , pro) => total + pro.price, 0)
    let total =0;
    for(let i = 0;i < cart.length; i++){
        const product = cart[i];
        total = total + product.price;
    }
    let shipping = 12.99;
    if(total > 100){
        shipping = 0;
    }else if(total > 50){
        shipping = 7;
    }
    const tax =total / 10;
    const grandTotal = (total + shipping + Number(tax)).toFixed(2)

    return (
        <div>
            <h4>Order Samarry</h4>
            <p>Items Orderd :{cart.length}</p>
            <p><small>Shipping cost : {shipping}</small></p>
            <p><small>Vat + Text : {tax}</small></p>
            <p>Total price : {grandTotal}</p>
        </div>
    );
};

export default Cart;