import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSellerProducts } from '../../utils/data/productData';
import ProductCard from '../../components/ProductCard';
import { useAuth } from '../../utils/context/authContext';

function Store() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getAllProducts = () => {
    getSellerProducts(user.id)
      .then((data) => {
        console.warn(data); // Check if the data contains the correct products for the current user
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, [user]);

  return (
    <>
      <div className="post-header">
        <h1 className="welcome-text text-center">My Store</h1>
      </div>
      <hr />
      <Button
        className="product-btn"
        onClick={() => {
          router.push('/sellers/new');
        }}
      >
        Add a New Product
      </Button>
      <div className="container">
        <div className="row pt-5">
          <div className="col-10">
            <div className="row">
              {products.map((product) => (
                <div key={`product--${product.id}`} className="col-lg-4 col-h-100 mb-3 d-flex align-items-stretch user-cards">
                  <div className="card-body d-flex flex-column">
                    <section className="user">
                      {console.warn(products)}
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

export default Store;
