import "./Orders.css";

import api from "../../services/api";

import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get(
        `/orders/${user.id}`
      );

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        <div className="orders-container">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <h3>Order #{order.id}</h3>

              <p>
                Total Amount:
                ₹ {order.totalAmount}
              </p>

              <p>Status: {order.status}</p>

              <p>
                Ordered On:
                {" "}
                {new Date(
                  order.orderDate
                ).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;

