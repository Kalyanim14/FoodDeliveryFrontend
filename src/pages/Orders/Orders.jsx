import "./Orders.css";

import api from "../../services/api";

import { useEffect, useState } from "react";

function Orders() {

  const [orders, setOrders] =
    useState([]);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  useEffect(() => {

    if (user?.id) {
      fetchOrders();
    }

  }, []);

  // FETCH ORDERS

  const fetchOrders = async () => {

    try {

      const response = await api.get(
        `/orders/${user.id}`
      );

      console.log(
        "Orders Response:",
        response.data
      );

      setOrders(
        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (error) {

      console.log(error);

      setOrders([]);
    }
  };

  // CANCEL ORDER

  const cancelOrder = async (id) => {

    try {

      const response =
        await api.put(
          `/orders/${id}?status=CANCELLED`
        );

      console.log(response.data);

      fetchOrders();

    } catch (error) {

      console.log(error);
    }
  };

  // DELETE ORDER

  const deleteOrder = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this order?"
      );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/orders/${id}`
      );

      fetchOrders();

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="orders-page">

      <h1>My Orders</h1>

      {orders.length === 0 ? (

        <h2 className="noitems">
          No Orders Found
        </h2>

      ) : (

        <div className="orders-container">

          {orders.map((order) => (

            <div
              className="order-card"
              key={order.id}
            >

              <h3>
                Order #{order.id}
              </h3>

              <p>
                Total Amount:
                {" "}
                ₹ {order.totalAmount}
              </p>

              <p>
                Status:
                {" "}

                <span className="status">
                  {order.status}
                </span>
              </p>

              <p>
                Ordered On:
                {" "}

                {new Date(
                  order.orderDate
                ).toLocaleString()}
              </p>

              <div className="order-buttons">

                {order.status !==
                  "CANCELLED" && (

                  <button
                    className="cancel-btn"
                    onClick={() =>
                      cancelOrder(order.id)
                    }
                  >
                    Cancel Order
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteOrder(order.id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Orders;