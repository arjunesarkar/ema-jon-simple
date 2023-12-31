import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon you want to use
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props)
    const { name, img, seller, price, stock, key } = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'><Link to={"/product/"+key}>{name}</Link></h4>
                <br />
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <br />
                <p><small>only {stock} left in stock - order soon</small></p>
               { props.showAddToCart && <button 
                onClick={()=>props.handelAddproduct(props.product)} 
                className='main-button'>
                    <FontAwesomeIcon icon={faCartShopping} />
                     add to cart</button>}
            </div>
        </div>
    );
};

export default Product;
