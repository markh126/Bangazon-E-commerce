// import axios from 'axios';
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

const addToCart = (productId, quantity, customerId) => {
  fetch(`${clientCredentials.databaseURL}/api/orders/${customerId}/add_to_cart/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${customerId}`, // If needed, replace this with the actual user token or authentication header
    },
    body: JSON.stringify({
      product_id: productId,
      quantity, // Make sure the quantity property is included in the request body
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

// const addToCart = (productId, quantity) => {
//   axios.post(`${clientCredentials.databaseURL}/api/orders/add_to_cart/`, {
//     product_id: productId,
//     quantity,
//   })
//     .then((response) => {
//       console.warn('Item added to cart successfully', response);
//     })
//     .catch((error) => {
//       console.error('Error adding item to cart:', error);
//     });
// };

export {
  getOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  addToCart,
};
