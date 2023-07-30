import { clientCredentials } from '../client';

const getProducts = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSellerProducts = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products?sellerId=${userId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createProduct = (product, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products`, {
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateProduct = (product) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/${product.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve((data)))
    .catch(reject);
});

const getProductsBySeller = (sellerId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products?sellerId=${sellerId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getOrderProducts = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/order_products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleOrderProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/order_products/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getProducts,
  getSellerProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsBySeller,
  getOrderProducts,
  getSingleOrderProduct,
};
