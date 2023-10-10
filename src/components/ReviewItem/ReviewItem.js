import React from 'react';

const ReviewItem = (props) => {
    const {name , quantity,key, price} = props.product;
    const cartStyle = {
        borderBottom:'1px solid gray',
        marginBottom: '2px',
        paddingBottom: '4px',
        marginLeft: '200px'
    }
    return (
        <div style={cartStyle} className='review-item'>
            <h4 className='product-name'>{name}</h4>
            <p>Quantity : {quantity}</p>
            <p><small>$ {price}</small></p>
            <br />
            <button
             className='main-button'
             onClick={() => props.removeProduct(key)}
             >Remove</button>
        </div>
    );
};

export default ReviewItem;