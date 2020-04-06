import React, { useState } from "react"
import { isAuthenticated } from "../auth";
import { createCategory } from "./api.request";
import { Link } from "react-router-dom";
import Layout from "../components/layout.component";

const NewCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localStorage
  const { user, token } = isAuthenticated();

  const handleChange = e => {
    setError('');
    setName(e.target.value);
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // make request to API ti create category
    createCategory(user._id, token, { name })
    .then(data => {
      if(data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => (
    <form onSubmit={ handleSubmit } >
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input type="text" className="form-control" onChange={ handleChange } value={ name } autoFocus required />
      </div>
      <button className="btn btn-outline-primary">Create</button>
    </form>
  )

  const showSuccess = () => {
    if(success) {
      return <h3 className="text-success">New category, { name } created.</h3>
    }
  };
  
  const showError = () => {
    if(error) {
      return <h3 className="text-danger">Category already exists.</h3>
    }
  };

  const back = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">Back to dashboard</Link>
    </div>
  );
  
  return (
    <Layout title='New category' description={`G'day ${ user.name }, ready to add a new product category?`}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          { showSuccess() }
          { showError() }
          { newCategoryForm() }
          { back() }
        </div>
      </div>
    </Layout>
  )
};

export default NewCategory;