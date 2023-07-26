import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { getSingleProduct, deleteProduct } from '../../utils/data/productData';

export default function ViewProducts() {
  const [productDetails, setProductDetails] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const isCurrentUserProduct = user.id === productDetails.seller_id?.id;

  const deleteThisProduct = () => {
    if (window.confirm(`Do you want to remove ${productDetails.name} from your store?`)) {
      deleteProduct(id).then(() => router.push('/sellers/store'));
    }
  };

  useEffect(() => {
    getSingleProduct(id).then(setProductDetails);
  }, [id]);

  return (
    <>
      <Head>
        <title>Product Page</title>
      </Head>
      <div className="d-flex flex-column">
        <Image
          className="product-image"
          src={productDetails.product_image_url}
          alt={productDetails.name}
          style={{
            width: '300px', borderRadius: '0px', border: '3px solid #014415', boxShadow: '6px 6px rgb(216, 208, 208)',
          }}
        />
      </div>
      <div className="profile-font" style={{ marginTop: '35px' }}>
        <h2 className="post-details-title">{productDetails.name}</h2>
        <h5 className="post-details-title">${productDetails.price}</h5>
        <p className="post-content">{productDetails.product_info} </p>
        <p className="post-details-text">Category: {productDetails.category} </p>
        <footer>
          <Link passHref href={`/sellers/store/${id}`}>
            <a href={`/sellers/store/${id}`}>Seller: {productDetails.seller_id?.first_name} {productDetails.seller_id?.last_name}</a>
          </Link>
        </footer>
        {isCurrentUserProduct ? (
          <>
            <Button
              className="sub-btn"
              onClick={() => {
                router.push(`/sellers/edit/${productDetails.id}`);
              }}
            >
              Edit Product
            </Button>
            <Button variant="danger" className="unsub-btn" onClick={deleteThisProduct}> Delete Product</Button>
          </>
        ) : ''}
      </div>
    </>
  );
}
