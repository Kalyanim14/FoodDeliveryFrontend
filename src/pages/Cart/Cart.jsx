import "./Cart.css";

import api from "../../services/api";

import { useEffect, useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await api.get(
        `/cart/${user.id}`
      );

      setCartItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (cartId) => {
    try {
      await api.delete(`/cart/${cartId}`);

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const placeOrder = async () => {
    try {
      await api.post(`/orders/${user.id}`);

      alert("Order Placed Successfully");

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total +
      item.foodItem.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <h2 className="noitems">Cart is Empty</h2>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-card" key={item.id}>
                <div>
                  <h3>{item.foodItem.name}</h3>

                  <p>
                    ₹ {item.foodItem.price}
                  </p>

                  <span>
                    Quantity: {item.quantity}
                  </span>
                </div>

                <button
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: ₹ {totalAmount}</h2>

            <button onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

