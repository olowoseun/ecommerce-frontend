import React, { useState, useEffect } from 'react';
import Layout from './layout.component';
import { getSingleProduct, getRelatedProducts } from '../main/api.main';
import Card from './card.component';

const Product = props => {

  const [ product, setProduct ] = useState({});
  const [ error, setError ] = useState(false);
  const [ relatedProducts, setRelatedProducts ] = useState([]);

  const loadSingleProduct = productId => {
    getSingleProduct(productId)
    .then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        getRelatedProducts(data._id)
        .then(data => {
          if(data.error) {
            setError(data.error);
          } else {
            setRelatedProducts(data);
          }
        });
      }
    })
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [ props ]);

  return (
    <Layout 
      title={ product && product.name } 
      description={ product && product.description && `${product.description.substring(0, 50)} ...` } 
      className="container">
        <div className="row">
          <div className="col-8">
            { product && product.description && <Card product={ product } showViewButton={ false } /> }
          </div>
          <div className="col-4">
            <h4>Related Products</h4>
            { relatedProducts.map((product, i) => (
              <div key={ i } className="mb-3">
                <Card key={ i } product ={ product } />
              </div>
            ))}
          </div>
        </div>
    </Layout>
  )
}; 

export default Product;