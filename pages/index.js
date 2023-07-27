import React, { useEffect, useState } from 'react';
import { getProducts } from '../utils/data/productData';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  const getAllProducts = () => {
    getProducts().then((data) => setProducts(data));
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className="post-header">
        <h1 className="welcome-text text-center">Welcome, {user.first_name} {user.last_name}</h1>
      </div>
      <hr />
      <div className="container">
        <div className="row pt-5">
          <div className="col-10">
            <div className="row">
              {products.map((product) => (
                <div key={`product--${product.id}`} className="col-lg-4 col-h-100 mb-3 d-flex align-items-stretch user-cards">
                  <div className="card-body d-flex flex-column">
                    <section className="user">
                      <ProductCard id={product.id} name={product.name} productImageUrl={product.product_image_url} price={product.price} productInfo={product.product_info} category={product.category} sellerId={product.seller_id} added={product.added} onUpdate={getAllProducts} />
                    </section>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
