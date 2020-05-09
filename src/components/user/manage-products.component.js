import React, { useEffect } from 'react';
import Layout from "../layout.component";
import { useState } from 'react';
import { getProducts, removeProduct } from '../../admin/api.request';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../auth';

const ManageProducts = () => {

  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then(data => {
      if(data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const remove = (prouctId) => {
    removeProduct(prouctId, user._id, token).then(data => {
      if(data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    })
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title="Manage Products"
      description="Product administration"
      className='container-fluid'>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total { products.length } products</h2>
          <hr/>
          <ul className="list-group">
            { products.map(product => (
              <li key={ product._id} className="list-group-item d-flex justify-content-between align-items-center">
                <strong>{ product.name }</strong>
                <Link to={`/admin/product/update/${ product._id }`}>
                  <span className="badge badge-warning badge-pill">Update</span>
                </Link>
                <span onClick={ () => remove(product._id) } className="badge badge-warning badge-pill">Delete</span>

              </li>
            ))}
            
          </ul>
        </div>
      </div>
    </Layout>
  )
};

export default ManageProducts;