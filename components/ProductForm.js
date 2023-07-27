import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createProduct, getSingleProduct, updateProduct } from '../utils/data/productData';

const initialState = {
  name: '',
  productImageUrl: '',
  price: 0,
  productInfo: '',
  category: '',
};

const ProductForm = ({ obj }) => {
  const [currentProduct, setCurrentProduct] = useState(initialState);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      getSingleProduct(id).then((productObj) => {
        setCurrentProduct((prevState) => ({
          ...prevState,
          id: productObj.id,
          name: productObj.name,
          productImageUrl: productObj.product_image_url,
          price: productObj.price,
          productInfo: productObj.product_info,
          category: productObj.category,
        }));
      });
    }
  }, [obj, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentProduct.id) {
      const product = {
        id: currentProduct.id,
        name: currentProduct.name,
        productImageUrl: currentProduct.productImageUrl,
        price: Number(currentProduct.price),
        productInfo: currentProduct.productInfo,
        category: currentProduct.category,
        sellerId: user.id,
      };
      updateProduct(product, user.uid).then(() => router.push('/sellers/store'));
    } else {
      const product = {
        id: currentProduct.id,
        name: currentProduct.name,
        productImageUrl: currentProduct.productImageUrl,
        price: Number(currentProduct.price),
        productInfo: currentProduct.productInfo,
        category: currentProduct.category,
        sellerId: user.id,
      };
      createProduct(product, user.uid).then(() => router.push('/sellers/store'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" required value={currentProduct.name} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Image Url</Form.Label>
          <Form.Control name="productImageUrl" required value={currentProduct.productImageUrl} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control name="price" required value={currentProduct.price} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Info</Form.Label>
          <Form.Control name="productInfo" required value={currentProduct.productInfo} onChange={handleChange} />
        </Form.Group>

        <FloatingLabel controlId="floatingSelect" label="Category">
          <Form.Select
            aria-label="Category"
            name="category"
            onChange={handleChange}
            className="mb-3"
            value={currentProduct.category}
            required
          >
            <option>Select A Category</option>
            <option value="DVD">DVD</option>
            <option value="Blu-ray/UHD">Blu-ray/UHD</option>
            <option value="VHS">VHS</option>
            <option value="LaserDisk">LaserDisk</option>
            <option value="Random">Random</option>
          </Form.Select>
        </FloatingLabel>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

ProductForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    productImageUrl: PropTypes.string,
    price: PropTypes.number,
    productInfo: PropTypes.string,
    category: PropTypes.string,
  }),
};

ProductForm.defaultProps = {
  obj: initialState,
};

export default ProductForm;
