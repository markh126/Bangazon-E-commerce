/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const OrderCard = ({
  id,
  datePlaced,
  open,
}) => {
  const orderStatus = () => {
    if (open) {
      return 'Open';
    }
    return 'Closed';
  };

  return (
    <Card className="text-center product-card" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>
          Order Date: {datePlaced}
        </Card.Title>
      </Card.Body>
      <Card.Footer>
        Order ID #: {id} <br />
        Status: {orderStatus()}
      </Card.Footer>
    </Card>
  );
};

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  datePlaced: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
};

export default OrderCard;
