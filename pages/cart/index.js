import React, { useEffect, useState } from 'react';
import { getOrderProducts } from '../../utils/data/productData';
import ProductCard from '../../components/ProductCard';
import { useAuth } from '../../utils/context/authContext';

function Cart() {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  const getAllProducts = () => {
    getOrderProducts(user.id)
      .then((data) => {
        console.warn(data);
        const joinedProducts = data.filter((product) => product.joined === true);

        setProducts(joinedProducts);
      })
      .catch((error) => console.error('Error fetching order products:', error));
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <hr />
      <div className="row">
        {products.map((product) => (
          <div key={`product--${product.id}`} className="col-lg-4 col-h-100 mb-3 d-flex align-items-stretch product-cards">
            <div className="card-body d-flex flex-column">
              <section className="products">
                <ProductCard id={product.id} name={product.name} productImageUrl={product.product_image_url} price={product.price} productInfo={product.product_info} category={product.category} sellerId={product.seller_id} joined={product.joined} onUpdate={getAllProducts} />
                {console.warn(products)}
              </section>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Cart;
