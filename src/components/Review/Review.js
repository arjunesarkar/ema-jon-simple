import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImg from '../../img/giphy.gif';
import { useNavigate } from 'react-router-dom';


const Review = () => {
    const [cart , setCart] = useState([]);
    const [orderPleace , setOrderPlace] = useState(false);
    const navigate = useNavigate();
    const hendelProcudeCheakout = () => {
        navigate('/Shipment')
    }
    const removeProduct = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }

    useEffect(()=>{
    const saved = getDatabaseCart();
    const productKeys = Object.keys(saved)
    const cartProducts = productKeys.map(key => {
        const product = fakeData.find(pd => pd.key === key)
        product.quantity = saved[key]
        return product;
    } )
        setCart(cartProducts);

} ,[]);
    let thankYou ;
    if(orderPleace){
        thankYou = <img src={happyImg} alt="" />
    }

    return (
        <div className='twins-container'>
         <div className='product-container'>
         {
            cart.map(
                pd => <ReviewItem
                key ={pd.key}
                removeProduct= {removeProduct}
                 product ={pd}>
                </ReviewItem>)
          }
          {thankYou}
         </div>
         <div className='cart-container'>
          <Cart cart={cart}>
            <button onClick={hendelProcudeCheakout} className='main-button'>Procude Cheakout</button>
          </Cart>
         </div>
        </div>
    );
};

export default Review;