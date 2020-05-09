import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../auth';
import { Link } from 'react-router-dom';
import Layout from '../layout.component';
import { getPurchaseHistory } from './api.user';
import moment from 'moment';


const UserDashboard = () => {
  const [history, setHistory] = useState([]);
  const { user: { _id, name, email, role }, token } = isAuthenticated();

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then(data => {
      if(data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    })
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => (
    <div className='card'>
      <h4 className='card-header'>User Links</h4>
      <ul className='list-group'>
        <li className='list-group-item'>
          <Link to='/cart' className='nav-link'>My Cart</Link>
        </li>
        <li className='list-group-item'>
          <Link to={ `/profile/${ _id } `} className='nav-link'>Update profile</Link>
        </li>
      </ul>
    </div>
  );

  const userInfo = () => (
    <div className='card mb-5'>
      <h3 className='card-header'>User Information</h3>
      <ul className='list-group'>
        <li className='list-group-item'>{ name }</li>
        <li className='list-group-item'>{ email }</li>
        <li className='list-group-item'>{ role === 1 ? 'Admin' : 'Registered user'}</li>
      </ul>
    </div>
  );

  const purchaseHistory = (history) => (
    <div className='card mb-5'>
      <h3 className='card-header'>Purchase History </h3>
      <ul className='list-group'>
        <li className='list-group-item'>
          { history.map(item => (
            <>
            <hr />
              { item.products.map(product => (
                <div key={ product._id }>
                  <h5>Product name: { product.name }</h5>
                  <h5>Product price: ${ product.price }</h5>
                  <h5>Purchased { moment(product.created_at).fromNow() }</h5>
                </div>
              ))}
            </>
          ))}
        </li>
      </ul>
    </div>
  );

  return (
    <Layout title='Dashboard' description={ `G'day ${ name }.` }>
      <div className="row">
        <div className="col-3">
          { userLinks() }
        </div>
        <div className="col-9">
          { userInfo() }
          { purchaseHistory(history) }
        </div>
      </div>
    </Layout>
  )
};

export default UserDashboard;