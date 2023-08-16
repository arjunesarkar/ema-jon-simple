import './Shop.css';
import fakeData from "../../fakeData";
import React, { useState } from 'react';
import Product from '../product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    const handelAddproduct = (product)=>{
        console.log('product added' ,product)
        const newCart = [...cart ,product];
        setCart(newCart)
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product handelAddproduct={handelAddproduct} product={product}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;