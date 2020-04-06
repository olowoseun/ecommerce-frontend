import React, { useState } from 'react';
import Layout from '../layout.component';
import { signin, authenticate, isAuthenticated } from '../../auth';
import { Redirect } from 'react-router-dom';

const Signin = () => {
  
  const [ values, setValues ] = useState({
    email: 'temi@example.com',
    password: 'passcod3',
    error: '',
    loading: false,
    redirect_to_referrer: false
  });

  const { email, password, loading, error, redirect_to_referrer } = values;
  const { user } = isAuthenticated();

  const handleChange = name => e => {
    setValues({ ...values, error: false, [ name ]: e.target.value });
  };

  const handleSubmit = e => {
     e.preventDefault();
     setValues({ ...values, error: false, loading: true });
     signin({ email, password }).then(data => {
      if(data.error) {
        setValues({ ...values, error: data.error, loading: false})
      } else {
        authenticate(data, () => {
          setValues({ ...values, redirect_to_referrer: true });
        });
      }
     });
  };

  const signinForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input type="email" className="form-control" value={ email } onChange={ handleChange('email') } />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input type="password" className="form-control" value={ password } onChange={ handleChange('password') } />
      </div>

      <button onClick={ handleSubmit } className="btn btn-primary">Submit</button>
    </form>
  );

  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none'}}>
      { error }
    </div>
  );
  
  const showLoading = () => (
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    )
  );

  const redirectTo = () => {
    if(redirect_to_referrer) {
      if(user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if(isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout title="Signin" description="User signin" className="container col-md-8 offset-md-2">
      { showLoading() }
      { showError() }
      { signinForm() }
      { redirectTo() }

    </Layout>
  );
};

export default Signin;
