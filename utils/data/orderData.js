import { clientCredentials } from '../client';

const getOrders = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createOrder = (order, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders`, {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateOrder = (order) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${order.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve((data)))
    .catch(reject);
});

const addToCart = (productId, userId) => {
  fetch(`${clientCredentials.databaseURL}/api/orders/${userId}/add_to_cart/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${userId}`,
    },
    body: JSON.stringify({
      product_id: productId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.warn('Item added to cart successfully', data);
    })
    .catch((error) => {
      console.error('Error adding item to cart:', error);
    });
};

const removeFromCart = (productId, userId) => fetch(`${clientCredentials.databaseURL}/api/orders/${userId}/remove_from_cart/${productId}`, {
  method: 'DELETE',
  headers: {
    Authorization: `${userId}`,
  },
});

export {
  getOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  addToCart,
  removeFromCart,
};
