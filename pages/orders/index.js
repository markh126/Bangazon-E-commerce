import { useEffect, useState } from 'react';
import { getOrders } from '../../utils/data/orderData';
import { useAuth } from '../../utils/context/authContext';
import OrderCard from '../../components/OrderCard';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  const getAllOrders = () => {
    getOrders(user.id).then((data) => setOrders(data));
  };

  useEffect(() => {
    getAllOrders();
  }, [user]);

  return (
    <>
      <h1>Order History</h1>
      <div className="container">
        <div className="row pt-5">
          <div className="col-10">
            <div className="row">
              {orders.map((order) => (
                <div key={`order--${order.id}`} className="col-lg-4 col-h-100 mb-3 d-flex align-items-stretch user-cards">
                  <div className="card-body d-flex flex-column">
                    <section className="user">
                      <OrderCard id={order.id} datePlaced={order.date_placed} open={order.open} onUpdate={getAllOrders} />
                    </section>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
