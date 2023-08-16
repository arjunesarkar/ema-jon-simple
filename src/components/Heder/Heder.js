import React from 'react';
import logo from '../../img/logo.png';
import './Heder.css'
const Heder = () => {
    return (
        <div className='header'>
               <img src={logo} alt="" /> 
               <nav>
                <a href="shop">Shop</a>
                <a href="review">Order Review</a>
                <a href="manage">Manage Inventory</a>
               </nav>  
        </div>
    );
};

export default Heder;