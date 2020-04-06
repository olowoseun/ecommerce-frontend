import React, { useState } from 'react';
import Layout from '../layout.component';
import { signup } from '../../auth';
import { Link } from 'react-router-dom';

const Signup = () => {

  const [ values, setValues ] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  });

  const { name, email, password, error, success } = values;

  const handleChange = name => e => {
    setValues({ ...values, error: false, [ name ]: e.target.value });
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    signup({ name, email, password })
    .then(data => {
      if(data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({ ...values, name: '', email: '', password: '', error: '', success: true });
      }
    })
  };

  const signupForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input type="text" className="form-control" value={ name } onChange={ handleChange('name') } />
      </div>
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
  
  const showSuccess = () => (
    <div className="alert alert-success" style={{ display: success ? '' : 'none'}}>
      Account created successfully. Please <Link to="/signin">sign in</Link>.
    </div>
  );

  return (
    <Layout title="Signup" description="User signup" className="container col-md-8 offset-md-2">
      { showSuccess() }
      { showError() }
      { signupForm() }
    </Layout>
  );
};

export default Signup;
