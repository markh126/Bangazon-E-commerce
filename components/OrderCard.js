/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const OrderCard = ({
  id,
}) => (
  <Card className="text-center product-card" style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>${id}
      </Card.Title>
    </Card.Body>
  </Card>
);
OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
};

export default OrderCard;
