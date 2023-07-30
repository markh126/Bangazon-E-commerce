/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { addToCart, removeFromCart } from '../utils/data/orderData';
import { useAuth } from '../utils/context/authContext';

const ProductCard = ({
  id,
  name,
  productImageUrl,
  price,
  category,
  sellerId,
  joined,
}) => {
  const { user } = useAuth();
  const addItemToCart = () => {
    if (!id) {
      console.error('Invalid product information');
      return;
    }
    addToCart(id, user.id);
  };

  const removeItemFromCart = () => {
    if (!id) {
      console.error('Invalid product information');
      return;
    }
    removeFromCart(id, user.id);
  };

  return (
    <Card className="text-center product-card" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={productImageUrl} />
      <Card.Body>
        <Card.Title>
          <Link passHref href={`/sellers/${id}`}>
            <a href={`/sellers/${id}`}>{name}</a>
          </Link>
        </Card.Title>
        <Card.Subtitle className="post-content">Price: ${price}</Card.Subtitle>
      </Card.Body>
      <Card.Footer className="text-muted">Category: {category}</Card.Footer>
      {sellerId.id !== user.id && !joined ? <Button onClick={addItemToCart}>Add to Cart</Button> : ''}
      {sellerId.id !== user.id && joined ? <Button onClick={removeItemFromCart}>Remove from Cart</Button> : ''}
      <Card.Footer>
        <Link passHref href={`/customers/${sellerId.id}`}>
          <a href={`/customers/${sellerId.id}`}>Seller: {sellerId.first_name} {sellerId.last_name}</a>
        </Link>
      </Card.Footer>
    </Card>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  productImageUrl: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  sellerId: PropTypes.object.isRequired,
  joined: PropTypes.bool.isRequired,
};

export default ProductCard;
