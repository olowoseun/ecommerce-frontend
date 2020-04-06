import React, { useState, useEffect } from 'react';
import Layout from './layout.component';
import { getProducts } from '../main/api.main';
import Card from './card.component';
import Search from './search.component';

const Home = () => {

  const [ productBySale, setProductBySale ] = useState([]);
  const [ productByArrival, setProductByArrival ] = useState([]);
  const [error, setError ] = useState(false);

  const loadProductsBySale = () => {
    getProducts('sold').then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setProductBySale(data);
      }
    });
  };
  
  const loadProductsByArrival = () => {
    getProducts('createdAt').then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setProductByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySale();
  }, []);

  return (
    <Layout title="Home page" description="Node React e-commerce" className="container">  
      <Search />
      <h2 className="mb-4">New Arrivals</h2>      
      <div className="row">
        { productByArrival.map((product, i) => (
          <div key={ i } className="col-4 mb-3">
            <Card product={ product } />
          </div>
        ))}
      </div>
      
      <h2 className="my-4">Best Sellers</h2>
      <div className="row">
        { productBySale.map((product, i) => (
            <div key={ i } className="col-4 mb-3">
              <Card product={ product } />
            </div>
        ))}
      </div>
    </Layout>
  );
};
  
export default Home;