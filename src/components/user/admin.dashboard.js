import React from 'react';
import { isAuthenticated } from '../../auth';
import { Link } from 'react-router-dom';
import Layout from '../layout.component';


const AdminDashboard = () => {

  const { user: { _id, name, email, role }} = isAuthenticated();

  const adminLinks = () => (
    <div className='card'>
      <h4 className='card-header'>Admin Links</h4>
      <ul className='list-group'>
        <li className='list-group-item'>
          <Link to='/category/create' className='nav-link'>Create category</Link>
        </li>
        <li className='list-group-item'>
          <Link to='/product/create' className='nav-link'>Create product</Link>
        </li>
      </ul>
    </div>
  );

  const adminInfo = () => (
    <div className='card mb-5'>
      <h3 className='card-header'>Admin Information</h3>
      <ul className='list-group'>
        <li className='list-group-item'>{ name }</li>
        <li className='list-group-item'>{ email }</li>
        <li className='list-group-item'>{ role === 1 ? 'Admin' : 'Registered user'}</li>
      </ul>
    </div>
  );

  return (
    <Layout title='Dashboard' description={ `G'day ${ name }.` } className="container-fluid">
      <div className="row">
        <div className="col-3">
          { adminLinks() }
        </div>
        <div className="col-9">
          { adminInfo() }
        </div>
      </div>
    </Layout>
  )
};

export default AdminDashboard;