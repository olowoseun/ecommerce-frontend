import React, { useState, useEffect } from "react";
import { getCart } from "../main/cart.helpers";

import Layout from './layout.component';
import Card from './card.component';
import { Link } from "react-router-dom";
import Checkout from "./checkout.component";

const Cart = () => {

  const [ items, setItems ] = useState([]);
  const [ run, setRun ] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [ run ]);

  const showCartItems = items => (
    <div>
      <h2>Your cart has {`${ items.length }`} items</h2>
      <hr />
      { items.map((product, i) => (
        <Card 
          key={ i } 
          product={ product } 
          showAddToCartButton={ false } 
          updateCart={ true } 
          showRemoveItemButton={ true }
          setRun={ setRun }
          run={ run } />
        )
      )}
    </div>
  );

  const noItemsMessage = () => (
    <h2>Your card is empty. <Link to="/shop">Continue shopping</Link></h2>
  );

  return (
    <Layout title="Cart" description="Manage your cart" className="container">
      <div className="row">
        <div className="col-6">
          { items.length > 0 ? showCartItems(items) : noItemsMessage() }
        </div>
        <div className="col-6">
          <h2 className="mb-2">Your cart summary</h2>
          <hr />
          <Checkout products={ items } setRun={ setRun } run={ run } />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;