import React, { useState, useEffect } from 'react';
import Layout from "./layout.component";
import { getCategories } from '../admin/api.request';
import Checkbox from './checkbox.component';
import Radio from './radio.component';
import { prices } from '../main/prices';
import { getFilteredProducts } from '../main/api.main';
import Card from './card.component';

const Shop = () => {

  const [ shopFilters, setShopFilters ] = useState({
    filters: { category: [], price: [] }
  });
  const [ categories, setCategories ] = useState([]);
  const [ error, setError ] = useState(false);
  const [ limit, setLimit ] = useState(6);
  const [ skip, setSkip ] = useState(0);
  const [ size, setSize ] = useState(0);
  const [ filteredResults, setFilteredResults ] = useState([]);

  const init = () => {
    getCategories ().then(data => {
      if(data.error) {
        setError(data.error );
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    // console.log(newFilters)

    getFilteredProducts(skip, limit, newFilters).then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.products);
        setSize(data.size);
        setSkip(0);
      }
    })
  };

  const loadMore = () => {
    let toSkip = skip + limit;

    getFilteredProducts(toSkip, limit, shopFilters.filters).then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setFilteredResults([ ...filteredResults, ...data.products ]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton =  () => {
    return (
      size > 0 && size >= limit && (
        <button className="btn btn-info mb-5" onClick={ loadMore }>Load more</button>
      )
    )
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, shopFilters.filters);
  });

  const handleFilters = (filters, filterBy) => {
    // console.log('Shop', filters, filterBy);
    const newFilters = { ...shopFilters };
    newFilters.filters[filterBy] = filters;

    if(filterBy === "price") {
      let price_values = handlePrice(filters);
      newFilters.filters[filterBy] = price_values;
    }
    loadFilteredResults(shopFilters.filters);
    setShopFilters(newFilters);
  };

  const handlePrice = value => {
    const data = prices;
    let array = [];

    for(let key in data) {
      if(data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array; 
  };

  return (
    <Layout title="Shop" description="Search and find books" className="container">
      <div className="row">
        <div className="col-3">
          <h4 className="mb-3">Filter by categories</h4>
          <ul>
            <Checkbox 
              categories={ categories } 
              handleFilters={ filters => handleFilters(filters, 'category')} />
          </ul>
          <h4 className="mb-3">Filter by price</h4>
          <div>
            <Radio 
              prices={ prices } 
              handleFilters={ filters => handleFilters(filters, 'price')} />
          </div>
        </div>
        <div className="col-9">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            { filteredResults.map((product, i) => (
              <div key={ i } className="col-4 mb-3">
                <Card product={ product } />
              </div>
            ))}
          </div>
          { loadMoreButton() }
        </div>
      </div>
    </Layout>
  );
};

export default Shop;