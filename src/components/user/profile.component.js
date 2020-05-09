import React, { useState, useEffect } from 'react';
import Layout from '../layout.component';
import { getUserProfile, updateUserProfile, updateUser } from './api.user';
import { isAuthenticated } from '../../auth';
import { Redirect } from 'react-router-dom';

const Profile = ({ match }) => {

  const [ values, setValues ] = useState({
    name: '',
    email: '',
    password: '',
    error: false,
    success: false
  });

  const { name, email, password, error, success } = values;
  const { token } = isAuthenticated();

  const init = (userId) => {
    // console.log(userId);
    getUserProfile(userId, token)
    .then(data => {
      if(data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateUserProfile(match.params.userId, token, { name, email, password })
    .then(data => {
      if(data.error) {
        console.log(data.error);
      } else {
        updateUser(data, () => {
          console.log(data);
          setValues({ ...values, name: data.name, email: data.email, success: true });
        });
      }
    });
  };

  const redirectUser = success => {
    if(success) {
      return <Redirect to="/cart" />
    }
  };

  const showUpdateProfile = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input type="text" 
            className="form-control" 
            value={ name } 
            onChange={ handleChange('name') } />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input type="email" 
            className="form-control" 
            value={ email } 
            onChange={ handleChange('email') } />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input type="password" 
            className="form-control" 
            value={ password } 
            onChange={ handleChange('password') } />
      </div>
      <button className="btn btn-primary" onClick={ handleSubmit }>Submit</button>
    </form>
  );

  return (
    <Layout title='Profile'
            description='Update your profile'
            className="container">
      <h2 className="mb-4">Profile update</h2>
      { showUpdateProfile(name, email, password) }
      { redirectUser(success) }
    </Layout>
  );
};

export default Profile;