import React, { useState, useEffect } from 'react';
import { getCategories } from '../admin/api.request';
import { all } from '../main/api.main';
import Card from './card.component';

const Search = () => {

  const [data, setData ] = useState({
    categories: [],
    category: '',
    term: '',
    results: [],
    searched: false
  });

  const { categories, category, term, results, searched } = data;

  const loadCatgeories = () => {
    getCategories().then(data => {
      if(data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    })
  };

  useEffect(() => {
    loadCatgeories();
  }, []);

  const searchData = () => {
    // console.log(term, category); 
    if(term) {
      all({ term: term || undefined, category })
      .then(response => {
        if(response.error){
          console.log(response.error);
        } else {
          setData({ ...data, results: response, searched: true });
        }
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    searchData();
  };
  
  const handleChange = name => e => {
    setData({ ...data, [name]: e.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if(searched && results.length > 0) {
      return `Found ${ results.length } items.`;
    }
    if(searched && results.length < 1) {
      return `No item(s) found.`;
    }
  };

  const searchedProducts = (results = []) => (
    <div>
      <h4 className="my-4">{ searchMessage(searched, results) }</h4>
      <div className="row">
        { results.map((product, i) => (<Card key={ i } product={ product } />))}
      </div>
    </div>
  );

  const searchForm = () => (
    <form onSubmit={ handleSubmit }>
      <span className="input-group-text">
        <div className="input-group input-group-md">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={ handleChange('category') }>
              <option value="all">All</option>
              { categories.map((category, i) => (<option key={ i } value={ category._id }>{ category.name }</option>))}
            </select>
          </div>
          <input 
          type="search" 
          className="form-control" 
          onChange={ handleChange('term') } 
          placeholder="Search ..." />
        </div>
        <div className="btn btn-group-append" style={{ border: 'none' }}>
          <button className="input-group-text">Search</button>  
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container mb-4">
        { searchForm() }
      </div>
      <div className="container mb-4">
        { searchedProducts(results) }
      </div>
    </div>
  );
};

export default Search;