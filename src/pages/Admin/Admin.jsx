import "./Admin.css";

import api from "../../services/api";

import { useEffect, useState } from "react";

function Admin() {
  const [restaurants, setRestaurants] = useState([]);

  const [restaurantData, setRestaurantData] =
    useState({
      name: "",
      address: "",
      phone: "",
    });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await api.get(
        "/restaurants"
      );

      setRestaurants(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setRestaurantData({
      ...restaurantData,
      [e.target.name]: e.target.value,
    });
  };

  const addRestaurant = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/restaurants",
        restaurantData
      );

      setRestaurantData({
        name: "",
        address: "",
        phone: "",
      });

      fetchRestaurants();

      alert("Restaurant Added");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <form
        className="admin-form"
        onSubmit={addRestaurant}
      >
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={restaurantData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={restaurantData.address}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={restaurantData.phone}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Add Restaurant
        </button>
      </form>

      <div className="admin-restaurants">
        {restaurants.map((restaurant) => (
          <div
            className="admin-restaurant-card"
            key={restaurant.id}
          >
            <h3>{restaurant.name}</h3>

            <p>{restaurant.address}</p>

            <span>{restaurant.phone}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;

