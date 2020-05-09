import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom"
import moment from 'moment';
import ProductImage from './product.image';
import { addItem, updateCartItem, removeCartItem } from '../main/cart.helpers';

const Card = ({ product, 
                showViewButton = true, 
                showAddToCartButton = true, 
                updateCart = false, 
                showRemoveItemButton = false,
                setRun = f => f,
                run = undefined }) => {

  const [ redirect, setRedirect ] = useState(false);
  const [ count, setCount ] = useState(product.count);

  const showStock = quantity => {
    return quantity > 0 
      ? <span className="badge badge-primary badge-pill">In stock</span>
      : <span className="badge badge-primary badge-pill">Out of stock</span>   
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = redirect => {
    if(redirect) {
      return <Redirect to="/cart" />
    }
  };

  const showAddToCart = _ => (
    <button className="btn btn-outline-secondary my-2" onClick={ addToCart } >
      Add to cart
    </button>
  );
  
  const showRemoveItem = showRemoveItemButton => (
    showRemoveItemButton && 
      <button className="btn btn-outline-danger my-2" onClick={ () => {
          removeCartItem(product._id);
          setRun(!run); // run useEffect in parent Cart
        } }>
        Remove
      </button>
  );

  const handleChange = productId => e => {
    let count = e.target.value;
    setRun(!run); // run useEffect in parent Cart
    setCount(count < 1 ? 1 : count);
    if(count >= 1) {
      updateCartItem (productId, count);
    }
  };

  const showCartUpdateOptions = updateCart => {
    return updateCart && (
      <div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Update quantity</span>
          </div>
          <input 
            type="number" 
            value={ count } 
            onChange={ handleChange(product._id) } 
            className="form-control" />
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <div className="card-header name">{ product.name }</div>
      <div className="card-body">
        { shouldRedirect(redirect) }
        <ProductImage item={ product } url="product" /> 
        <p className="lead mt-2">{ `${product.description.substring(0, 50)} ...` }</p>
        <p className="black-10">${ product.price }</p>
        <p className="black-9">Category: { product.category && product.category.name }</p>
        <p className="black-8">Added { moment(product.createdAt).fromNow() }</p>
        { showViewButton && (
          <Link to={ `/product/${ product._id }`}>
            <button className="btn btn-outline-primary my-2 mx-2">View</button>
          </Link>
        )}
        { showRemoveItem(showRemoveItemButton) } <br />
        { showStock(product.quantity) } 
        { showAddToCartButton && showAddToCart() }
        { showCartUpdateOptions(updateCart) }
      </div>
    </div>
  );
};

export default Card;