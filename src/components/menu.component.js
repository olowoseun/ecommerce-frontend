import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { signout, isAuthenticated } from '../auth';
import { itemCount } from '../main/cart.helpers';

const isActive = (history, path) => {
  if(history.location.pathname === path) {
    return { color: '#017aff' };
  } else {
    return { color: '#555' };
  }
};

const Menu = ({ history }) => (
  <div>
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom box-shadow">
      <h5 className="my-0 mr-md-auto font-weight-normal">Company name</h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <Link className="p-2" style={ isActive(history, '/') } to="/">Home</Link>     
        <Link className="p-2" style={ isActive(history, '/shop') } to="/shop">Shop</Link>     
        <Link className="p-2" style={ isActive(history, '/cart') } to="/cart">Cart<sup><small className="cart-badge ml-1">{ itemCount() }</small></sup></Link>     
        { isAuthenticated() && isAuthenticated().user.role === 1 && (
          <Link className="p-2" style={ isActive(history, '/admin/dashboard') } to="/admin/dashboard">Dashboard</Link>
        )}   
        
        { isAuthenticated() && isAuthenticated().user.role === 0 && (
          <Link className="p-2" style={ isActive(history, '/user/dashboard') } to="/user/dashboard">Dashboard</Link>
        )}   
                
      </nav>
      { !isAuthenticated() && (
        <Fragment>
          <Link className="btn btn-sm btn-outline-primary mx-2" to="/signin">Sign in</Link>
          <Link className="btn btn-sm btn-outline-primary mx-2" to="/signup">Sign up</Link>
        </Fragment>
      )}
      
      { isAuthenticated() && (
        <span className="btn btn-sm btn-outline-secondary mx-2" onClick={ () => signout(() => {history.push('/')})}>Sign out</span>
      )}
    </div>
    
  </div>
);

export default withRouter(Menu);