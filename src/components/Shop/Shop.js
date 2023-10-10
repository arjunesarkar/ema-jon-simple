import './Shop.css';
import fakeData from "../../fakeData";
import React, { useEffect, useState } from 'react';
import Product from '../product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const saved = getDatabaseCart();
        const productKeys = Object.keys(saved);
        const privicesCart = productKeys.map(exsistingkey => {
            const product = fakeData.find(pd => pd.key === exsistingkey);
            product.quantity = saved[exsistingkey]
            return product;
        })
        setCart(privicesCart)
    },[])

    const handelAddproduct = (product)=>{
        const  toBeAdded = product.key
        const sameProduct = cart.find(pd => pd.key === toBeAdded)
        let count =1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = sameProduct.quantity = 1
            const others = cart.filter(pd => pd.key !==toBeAdded)
            newCart = [...others , sameProduct]
        }else{
            product.quantity =1;
            newCart = [...cart , product]
        }
        setCart(newCart)
        addToDatabaseCart(product.key ,count)
    }
    return (
        <div className="twins-container">
            <div className="product-container">
                {
                    products.map(product => <Product
                        showAddToCart={true} 
                        handelAddproduct={handelAddproduct} 
                        product={product}>
                            
                        </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <Link to="/review">
                    <button className='main-button'>Review Order</button>
                </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;