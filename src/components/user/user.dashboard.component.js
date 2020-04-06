import React from 'react';
import { isAuthenticated } from '../../auth';
import { Link } from 'react-router-dom';
import Layout from '../layout.component';


const UserDashboard = () => {

  const { user: { _id, name, email, role }} = isAuthenticated();

  const userLinks = () => (
    <div className='card'>
      <h4 className='card-header'>User Links</h4>
      <ul className='list-group'>
        <li className='list-group-item'>
          <Link to='/cart' className='nav-link'>My Cart</Link>
        </li>
        <li className='list-group-item'>
          <Link to='/profile/update' className='nav-link'>Update profile</Link>
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

  const purchaseHistory = () => (
    <div className='card mb-5'>
      <h3 className='card-header'>Purchase History </h3>
      <ul className='list-group'>
        <li className='list-group-item'>history</li>
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
          { purchaseHistory() }
        </div>
      </div>
    </Layout>
  )
};

export default UserDashboard;