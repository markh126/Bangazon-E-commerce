import ProductForm from '../../components/ProductForm';
import { useAuth } from '../../utils/context/authContext';

const NewProduct = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Add a New Product</h2>
      <ProductForm user={user} />
    </div>
  );
};

export default NewProduct;
