export const addItem = (item, next) => {
  let cart = [];

  if(typeof window !== 'undefined') {
    if(localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.push({
      ...item, 
      count: 1
    });

    /** remove duplicate items in cart
     * build an array from a new Set and turn it back into an
     * array using Array.from so that later we can re-map it
     * Set will only allow unique values. Pass the ids of each
     * product. If the loop tries to add the same value again, it
     * will be ignored. With the array of ids from the first map(),
     * run map() again and return the actual product from the cart
     */
    cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
      return cart.find(product => product._id === id)
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    next();
  }
};

export const itemCount = () => {
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart')).length;
    }
  }
  return 0;
};

export const getCart = () => {
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart'));
    }
  }
  return [];
};

export const updateCartItem = (productId, count) => {
  let cart = [];

  if(typeof window !== 'undefined') {
    if(localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart.map((product, i) => {
      if(product._id === productId) {
        cart[i].count = count;
      }
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const removeCartItem = (productId) => {
  let cart = [];

  if(typeof window !== 'undefined') {
    if(localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart.map((product, i) => {
      if(product._id === productId) {
        cart.splice(i, 1);
      }
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  return cart;
};

export const emptyCart = next => {
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('cart')) {
      localStorage.removeItem('cart');
      next();
    }
  }
};
