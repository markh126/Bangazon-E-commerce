/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

const ProductCard = ({
  id,
  name,
  productImageUrl,
  price,
  category,
  sellerId,
}) => (
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
    <Card.Footer>Seller: {sellerId.first_name} {sellerId.last_name}
    </Card.Footer>
  </Card>
);
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
