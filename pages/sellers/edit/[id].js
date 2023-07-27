import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleProduct } from '../../../utils/data/productData';
import ProductForm from '../../../components/ProductForm';

export default function EditProduct() {
  const [editProduct, setEditProduct] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleProduct(id).then(setEditProduct);
  }, [id]);

  return (
    <div>
      <h1>Edit Product</h1>
      <ProductForm obj={editProduct} />
    </div>
  );
}
