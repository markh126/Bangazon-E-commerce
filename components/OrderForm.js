import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { createOrder, getSingleOrder, updateOrder } from '../utils/data/orderData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  details: '',
  paymentType: '',
};

const OrderForm = ({ obj }) => {
  const [currentOrder, setCurrentOrder] = useState(initialState);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      getSingleOrder(id).then((orderObj) => {
        setCurrentOrder((prevState) => ({
          ...prevState,
          id: orderObj.id,
          details: orderObj.details,
          paymentType: orderObj.paymentType,
        }));
      });
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    if (currentOrder.id) {
      const order = {
        id: currentOrder.id,
        details: currentOrder.details,
        paymentType: currentOrder.paymentType,
      };
      updateOrder(order).then(() => router.push('/'));
    } else {
      const order = {
        id: currentOrder.id,
        details: currentOrder.details,
      };
      createOrder(order, user.uid).then(() => router.push('/'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Details</Form.Label>
          <Form.Control name="details" required value={currentOrder.details} onChange={handleChange} />
        </Form.Group>
        {currentOrder.id ? (
          <FloatingLabel controlId="floatingSelect" label="Payment">
            <Form.Select
              aria-label="Payment Type"
              name="paymentType"
              onChange={handleChange}
              className="mb-3"
              value={currentOrder.paymentType}
              required
            >
              <option>Select Payment Type</option>
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
              <option value="Apple Pay">Apple</option>
            </Form.Select>
          </FloatingLabel>
        ) : ''}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

OrderForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    details: PropTypes.string,
  }),
};

OrderForm.defaultProps = {
  obj: initialState,
};

export default OrderForm;
