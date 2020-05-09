import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/home.component';
import Signin from './components/user/signin.component';
import Signup from './components/user/signup.component';
import UserDashboard from './components/user/user.dashboard.component';
import UserRoute from './auth/user.route';
import AdminRoute from './auth/admin.route';
import NewCategory from './admin/new.category';
import NewProduct from './admin/new.product';
import AdminDashboard from './components/user/admin.dashboard';
import Shop from './components/shop.component';
import Cart from './components/cart.component';
import Product from './components/product.component';
import Profile from './components/user/profile.component';
import Orders from './admin/orders.component';
import ManageProducts from './components/user/manage-products.component';
import UpdateProduct from './admin/update.product.component';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={ Home } />
        <Route path='/shop' exact component={ Shop } />
        <Route path='/cart' exact component={ Cart } />
        <Route path='/signin' exact component={ Signin } />
        <Route path='/signup' exact component={ Signup } />
        <UserRoute path='/user/dashboard' exact component={ UserDashboard } />
        <AdminRoute path='/admin/dashboard' exact component={ AdminDashboard } />
        <AdminRoute path='/category/create' exact component={  NewCategory } />
        <AdminRoute path='/product/create' exact component={  NewProduct } />
        <AdminRoute path='/admin/product/update/:productId' exact component={  UpdateProduct } />
        <Route path="/product/:productId" exact component={ Product } />
        <UserRoute path='/profile/:userId' exact component={ Profile } />
        <AdminRoute path='/admin/orders' exact component={  Orders } />
        <AdminRoute path='/admin/products' exact component={  ManageProducts } />
        <UserRoute path='/admin/products' exact component={  ManageProducts } />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;