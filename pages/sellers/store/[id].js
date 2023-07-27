import React, { useEffect, useState } from 'react';
import { getProductsBySeller } from '../../../utils/data/productData';
import ProductCard from '../../../components/ProductCard';
import { useAuth } from '../../../utils/context/authContext';

function Store() {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  const getAllProducts = () => {
    getProductsBySeller(user.id).then((data) => setProducts(data));
  };

  useEffect(() => {
    getAllProducts();
  }, [user]);

  return (
    <>
      <hr />
      <div className="row">
        {products.map((product) => (
          <div key={`product--${product.id}`} className="col-lg-4 col-h-100 mb-3 d-flex align-items-stretch product-cards">
            <div className="card-body d-flex flex-column">
              <section className="products">
                <ProductCard id={product.id} name={product.name} productImageUrl={product.product_image_url} price={product.price} productInfo={product.product_info} category={product.category} sellerId={product.seller_id} added={product.added} onUpdate={getAllProducts} />
              </section>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Store;
