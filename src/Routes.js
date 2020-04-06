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
        <Route path="/product/:productId" exact component={ Product } />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;