/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { addToCart } from '../utils/data/orderData';
import { useAuth } from '../utils/context/authContext';

const ProductCard = ({
  id,
  name,
  productImageUrl,
  price,
  category,
  sellerId,
}) => {
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const addItemToCart = () => {
    // Ensure that the product has an 'id' property
    if (!id) {
      console.error('Invalid product information');
      return;
    }

    // Call the API function to add the product to the cart
    addToCart(id, quantity, user.id);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
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
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            step="1"
          />
        </label>
      </Card.Body>
      <Card.Footer className="text-muted">Category: {category}</Card.Footer>
      <Button onClick={addItemToCart}>Add to Cart</Button>
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
};

export default ProductCard;
