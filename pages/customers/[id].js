/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { signOut } from '../../utils/auth';
import { deleteUser, getSingleUser } from '../../utils/data/userData';
import { getProductsBySeller } from '../../utils/data/productData';
import ProductCard from '../../components/ProductCard';

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState({});
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const id = parseInt(router.query.id, 10);
  const isCurrentUserProfile = user.id === userDetails.id;

  const getAllProducts = () => {
    getProductsBySeller(id).then((data) => setProducts(data));
  };

  useEffect(() => {
    getAllProducts();
  }, [id]);

  const deleteProfile = () => {
    if (window.confirm('Are you sure you would like to delete your profile? You cannot undo this.')) {
      deleteUser(user.id).then(() => signOut());
    }
  };

  const getAUser = () => {
    getSingleUser(id).then((data) => setUserDetails(data));
  };

  useEffect(() => {
    getAUser(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Head>
        <title>Profile Page</title>
      </Head>
      <div className="d-flex flex-column">
        <Image
          className="plant-image"
          src={userDetails.profile_image_url}
          alt={userDetails.name}
          style={{
            width: '300px', borderRadius: '0px', border: '3px solid #014415', boxShadow: '6px 6px rgb(216, 208, 208)',
          }}
        />
      </div>
      <div className="profile-font" style={{ marginTop: '35px' }}>
        <h2 className="post-details-title">{userDetails.first_name} {userDetails.last_name}</h2>
        <h5 className="post-details-title">{userDetails.email}</h5>
        <p className="post-content">Username: {userDetails.username} </p>
        <p className="post-details-text">Bio: {userDetails.bio} </p>
        {isCurrentUserProfile ? (
          <>
            <Button
              className="sub-btn"
              onClick={() => {
                router.push(`/customers/edit/${userDetails.id}`);
              }}
            >
              Edit Profile
            </Button><Button variant="danger" className="unsub-btn" onClick={deleteProfile}> Delete Profile</Button><Button variant="success" className="signout-btn" onClick={signOut}> Sign Out</Button>
          </>
        ) : ''}
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
      </div>
    </>
  );
}
