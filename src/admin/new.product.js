import React, { useState, useEffect } from "react"
import { isAuthenticated } from "../auth";
import { createProduct, getCategories } from "./api.request";
import Layout from "../components/layout.component";

const NewProduct = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    created_product: '',
    redirect_to_profile: false,
    form_data: ''
  });

  const { name, 
    description, 
    price, 
    categories, 
    category, 
    shipping, 
    quantity, 
    loading, 
    error, 
    created_product, 
    redirect_to_profile,
    form_data } = values;

    // load categories and set form data
    const init = () => {
      getCategories().then(data => {
        if(data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, categories: data, form_data: new FormData() })
        }
      });
    };

    useEffect(() => {
      init();
    }, [])

  // destructure user and token from localStorage
  const { user, token } = isAuthenticated();
  
  // make request to API ti create category

  const handleChange = name => e => {
    const value = name === 'photo' ? e.target.files[0]: e.target.value;
    form_data.set(name, value);
    setValues({ ...values, [ name ]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, error: '', loading: true });

    createProduct(user._id, token, form_data)
    .then(data => {
      if(data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, name: '', description: '', photo: '', price: '', quantity: '', loading: false, created_product: data.name})
      }
    })
  };

  const newProductForm = (props) => (
    <form className="mb-3" onSubmit={ handleSubmit }>
      <h4>Upload photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input type="file" name="photo" accept="image/*"  onChange={ handleChange('photo') } />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input type="text" className="form-control" value={ name } onChange={ handleChange('name') } />
      </div>
      
      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea className="form-control" value={ description } onChange={ handleChange('description') }>

        </textarea>
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input type="number" className="form-control" value={ price } onChange={ handleChange('price') } />
      </div>
      
      <div className="form-group">
        <label className="text-muted">Category</label>
        <select className="form-control" onChange={ handleChange('category') }>
          <option value="DEFAULT" disabled>Select a category</option>
          { categories && categories.map((category, i) => (<option key={ i } value={ category._id}>{ category.name }</option>))}
        </select>
      </div>
      
      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select className="form-control" onChange={ handleChange('shipping') }>
          <option value="DEFAULT" disabled>Select shipping</option>
          <option value="0">No</option>
          <option value="1">Yes</option>     
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input type="number" className="form-control" value={ quantity } onChange={ handleChange('quantity') } />
      </div>

      <button className="btn btn-outline-primary">Create</button>
    </form>
  )

  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
      { error }
    </div>
  );
  
  const showSuccess = () => (
    <div className="alert alert-success" style={{ display: created_product ? '' : 'none' }}>
      <h2>{ `${ created_product } created. ` }</h2>
    </div>
  );
  
  const showLoading = () => (
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    )
  );

  return (
    <Layout title='New product' description={`G'day ${ user.name }, ready to add a new product?`}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          { showError() }
          { showSuccess() }
          { showLoading() }
          { newProductForm() }
        </div>
      </div>
    </Layout>
  )
};

export default NewProduct;