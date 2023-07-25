import { useRouter } from 'next/router';
import React from 'react';
import { Button } from 'react-bootstrap';

function Store() {
//   const [products, setProducts] = useState([]);
  const router = useRouter();
  //   const { user } = useAuth();

  return (
    <>
      <div className="post-header">
        <h1 className="welcome-text">My Store</h1>
        <Button
          className="product-btn"
          onClick={() => {
            router.push('/sellers/new');
          }}
        >
          Add a New Product
        </Button>
      </div>
      <hr />
    </>
  );
}

export default Store;
