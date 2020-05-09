import { API } from '../config';

export const createCategory = (userId, token, category)  => (
  // console.log(name, email, password); 
  fetch(`${API}/category/create/${ userId }`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ token }`
    },
    body: JSON.stringify(category)
  })
  .then(response => response.json())
  .catch(err => console.log(err))
);

export const createProduct = (userId, token, product)  => (
  // console.log(name, email, password); 
  fetch(`${API}/product/create/${ userId }`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${ token }`
    },
    body: product 
  })
  .then(response => response.json())
  .catch(err => console.log(err))
);

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: 'GET'
  })
  .then(response => response.json())
  .catch(err => console.log(err))
};

export const getOrders = (userId, token) => {
  return fetch(`${API}/orders/${ userId }`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${ token }`
    }
  })
  .then(response => response.json())
  .catch(err => console.log(err))
};

export const getOrderStatus = (userId, token) => {
  return fetch(`${API}/orders/status/${ userId }`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${ token }`
    }
  })
  .then(response => response.json())
  .catch(err => console.log(err))
};

export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(`${API}/orders/${ orderId }/status/${ userId }`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ token }`
    },
    body: JSON.stringify({ orderId, status })
  })
  .then(response => response.json())
  .catch(err => console.log(err))
};

/**
 * Product CRUD
 * get all products
 * get product
 * update product
 * delete product
 */

export const getProducts = () => {
  return fetch(`${API}/products?limit=undefined`, {
    method: 'GET'
  })
  .then(response => response.json())
  .catch(err => console.log(err))
};

export const getProduct = productId => {
  return fetch(`${API}/product/${ productId }`, {
    method: 'GET'
  })
  .then(response => response.json())
  .catch(err => console.log(err))
};

export const removeProduct = (productId, userId, token) => {
  return fetch(`${API}/product/remove/${ productId }/${ userId }`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ token }`
    }
  })
  .then(response => response.json())
  .catch(err => console.log(err))
};

export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/update/${ productId }/${ userId }`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${ token }`
    },
    body: product
  })
  .then(response => response.json())
  .catch(err => console.log(err))
};