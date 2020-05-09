import React, { useState, useEffect } from "react"
import { isAuthenticated } from "../auth";
import Layout from "../components/layout.component";
import { getOrders, getOrderStatus, updateOrderStatus } from "./api.request";
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    getOrders(user._id, token).then(data => {
      if(data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };
  
  const loadOrderStatus = () => {
    getOrderStatus(user._id, token).then(data => {
      if(data.error) {
        console.log(data.error);
      } else {
        setStatus(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadOrderStatus();
  }, []);

  const showOrders = _ => {
    if(orders.length > 0) {
      return <h1 className="text-danger display-3">Total orders: { orders.length }</h1>
    } else {
      return <h1 className="text-danger">No orders</h1>
    }
  }

  const showProductDetails = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{ key }</div>
      </div>
      <input type="text" value={ value } className="form-control" readOnly />
    </div>
  );

  const handleChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then(data => {
      if(data.error) {
        console.log('Failed to update status');
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = order => (
    <div className="form-group">
      <h3 className="mark mb-4">Status: { order.status }</h3>
      <select className="form-control"
              onChange={ () => handleChange(order._id) }>
        <option>Update status</option>
        { status.map(item => (<option key={ item } value={ item }>{ item }</option>))}
      </select>
    </div>
  );

  return (
    <Layout title='Orders' description={`G'day ${ user.name }, you can manage your orders here.`}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          { showOrders() }
          { orders.map(order => (
            <div 
              className="mt-5" 
              key={ order._id } 
              style={{ borderBottom: '5px solid indigo'}}>
              <h2 className="mb-5">
                <span className="bg-primary text-white">Order Id: { order._id }</span>
              </h2>
              <ul className="list-group mb-2">
                <li className="list-group-item">{ showStatus(order) }</li>
                <li className="list-group-item">Transaction Id: { order.transaction_id }</li>
                <li className="list-group-item">Amount: ${ order.amount }</li>
                <li className="list-group-item">Ordered by: { order.user.name }</li>
                <li className="list-group-item">Ordered { moment(order.created_at).fromNow() }</li>
                <li className="list-group-item">Delivery address: { order.address }</li>
              </ul>
              
              <h3 className="my-4 font-italic">
                Total products in order: { order.products.length }
              </h3>

              { order.products.map(product => (
                <div className="mb-4" 
                    key={ product._id }
                    style={{ 
                      padding: '20px',
                      border: '1px solid indigo'
                    }}>
                    { showProductDetails('Product name', product.name) }
                    { showProductDetails('Product price', product.price) }
                    { showProductDetails('Product count', product.count) }
                    { showProductDetails('Product id', product._id) }
                  </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Orders;