import "./Admin.css";
import api from "../../services/api";
import { useEffect, useState } from "react";
import food from '../../assets/food.jpg';

function Admin() {

  // RESTAURANTS
  const [restaurants, setRestaurants] =
    useState([]);


const [showRestaurantForm,
  setShowRestaurantForm] =
  useState(false);

const [showFoodForm,
  setShowFoodForm] =
  useState(false);


  const [restaurantData, setRestaurantData] =
    useState({
      name: "",
      address: "",
      phone: "",
    });

  const [editingRestaurantId,
    setEditingRestaurantId] =
    useState(null);

  // FOODS
  const [foods, setFoods] =
    useState([]);

  const [foodData, setFoodData] =
    useState({
      restaurantId: "",
      name: "",
      price: "",
      description: "",
    });

  const [editingFoodId,
    setEditingFoodId] =
    useState(null);

  useEffect(() => {
    fetchRestaurants();
    fetchFoods();
  }, []);

  // FETCH RESTAURANTS
  const fetchRestaurants = async () => {
    try {
      const response =
        await api.get("/restaurants");

      setRestaurants(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // FETCH FOODS
  const fetchFoods = async () => {
    try {
      const response =
        await api.get("/fooditems");

      setFoods(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE RESTAURANT INPUT
  const handleRestaurantChange = (e) => {
    setRestaurantData({
      ...restaurantData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE FOOD INPUT
  const handleFoodChange = (e) => {
    setFoodData({
      ...foodData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD / UPDATE RESTAURANT
  const handleRestaurantSubmit =
    async (e) => {

    e.preventDefault();

    try {

      if (editingRestaurantId) {

        await api.put(
          `/restaurants/${editingRestaurantId}`,
          restaurantData
        );

      } else {

        await api.post(
          "/restaurants",
          restaurantData
        );
      }

      setRestaurantData({
        name: "",
        address: "",
        phone: "",
      });

      setEditingRestaurantId(null);

      fetchRestaurants();

    } catch (error) {
      console.log(error);
    }
  };

  // EDIT RESTAURANT
  const editRestaurant = (restaurant) => {

    setRestaurantData({
      name: restaurant.name,
      address: restaurant.address,
      phone: restaurant.phone,
    });

    setEditingRestaurantId(
      restaurant.id
    );
  };

  // DELETE RESTAURANT
  const deleteRestaurant =
    async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete restaurant?"
      );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/restaurants/${id}`
      );

      fetchRestaurants();

    } catch (error) {
      console.log(error);
    }
  };

  // ADD / UPDATE FOOD
  const handleFoodSubmit =
    async (e) => {

    e.preventDefault();

    const payload = {
      name: foodData.name,
      price: foodData.price,
      description: foodData.description,
    };

    try {

      if (editingFoodId) {

        await api.put(
          `/fooditems/${editingFoodId}`,
          payload
        );

      } else {

        await api.post(
          `/fooditems/restaurant/${foodData.restaurantId}`,
          payload
        );
      }

      setFoodData({
        restaurantId: "",
        name: "",
        price: "",
        description: "",
      });

      setEditingFoodId(null);

      fetchFoods();

    } catch (error) {
      console.log(error);
    }
  };

  // EDIT FOOD
  const editFood = (food) => {

    setFoodData({
      restaurantId:
        food.restaurant?.id || "",

      name: food.name,

      price: food.price,

      description:
        food.description,
    });

    setEditingFoodId(food.id);
  };

  // DELETE FOOD
  const deleteFood =
    async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete food item?"
      );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/fooditems/${id}`
      );

      fetchFoods();

    } catch (error) {
      console.log(error);
    }
  };

  return (
<div className="admin-page">

  <h1>Admin Dashboard</h1>

  {/* RESTAURANTS SECTION */}

  <div className="section-header">
    <h2>Restaurants</h2>
  </div>
 
    <div className="cards-wrapper">

    <div className="horizontal-scroll">

        {restaurants.map((restaurant) => (

        <div
            className="modern-card"
            key={restaurant.id}
        >

            <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
            alt="restaurant"
            />

            <div className="card-content">

            <h3>{restaurant.name}</h3>

            <p>{restaurant.address}</p>

            <span>{restaurant.phone}</span>

            <div className="admin-buttons">

                <button
                className="edit-btn"
                onClick={() => {
                    editRestaurant(restaurant);
                    setShowRestaurantForm(true);
                }}
                >
                Edit
                </button>

                <button
                className="delete-btn"
                onClick={() =>
                    deleteRestaurant(
                    restaurant.id
                    )
                }
                >
                Delete
                </button>

            </div>

            </div>

        </div>
        ))}

    </div>

    {/* FIXED ADD CARD */}

    <div
        className="add-card"
        onClick={() => {
        setShowRestaurantForm(
            !showRestaurantForm
        );
        }}
    >
        +
    </div>

    </div>


  {/* RESTAURANT FORM */}

  {showRestaurantForm && (

    <form
      className="popup-form"
      onSubmit={handleRestaurantSubmit}
    >

      <h2>
        {editingRestaurantId
          ? "Update Restaurant"
          : "Add Restaurant"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Restaurant Name"
        value={restaurantData.name}
        onChange={
          handleRestaurantChange
        }
        required
      />

      <input
        type="text"
        name="address"
        placeholder="Address"
        value={restaurantData.address}
        onChange={
          handleRestaurantChange
        }
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={restaurantData.phone}
        onChange={
          handleRestaurantChange
        }
        required
      />

      <button type="submit">
        {editingRestaurantId
          ? "Update"
          : "Add"}
      </button>

    </form>
  )}

  <hr />

  {/* FOOD SECTION */}

  <div className="section-header">
    <h2>Food Items</h2>
  </div>

    <div className="cards-wrapper">

    <div className="horizontal-scroll">

        {foods.map((food) => (

        <div
            className="modern-card"
            key={food.id}
        >
            <img
            src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1200&auto=format&fit=crop"
            alt="Veg Pulao"
            />

            <div className="card-content">

            <h3>{food.name}</h3>

            <p>₹ {food.price}</p>

            <span>
                {food.restaurant?.name}
            </span>

            <div className="admin-buttons">

                <button
                className="edit-btn"
                onClick={() => {
                    editFood(food);
                    setShowFoodForm(true);
                }}
                >
                Edit
                </button>

                <button
                className="delete-btn"
                onClick={() =>
                    deleteFood(food.id)
                }
                >
                Delete
                </button>

            </div>

            </div>

        </div>
        ))}

    </div>

    {/* FIXED ADD CARD */}

    <div
        className="add-card"
        onClick={() =>
        setShowFoodForm(
            !showFoodForm
        )
        }
    >
        +
    </div>

    </div>

  {/* FOOD FORM */}

  {showFoodForm && (

    <form
      className="popup-form"
      onSubmit={handleFoodSubmit}
    >

      <h2>
        {editingFoodId
          ? "Update Food"
          : "Add Food"}
      </h2>

      <select
        name="restaurantId"
        value={foodData.restaurantId}
        onChange={handleFoodChange}
        required
      >

        <option value="">
          Select Restaurant
        </option>

        {restaurants.map(
          (restaurant) => (
            <option
              key={restaurant.id}
              value={restaurant.id}
            >
              {restaurant.name}
            </option>
          )
        )}

      </select>

      <input
        type="text"
        name="name"
        placeholder="Food Name"
        value={foodData.name}
        onChange={handleFoodChange}
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={foodData.price}
        onChange={handleFoodChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={foodData.description}
        onChange={handleFoodChange}
        required
      />

      <button type="submit">
        {editingFoodId
          ? "Update"
          : "Add"}
      </button>

    </form>
  )}

</div>
  );
}

export default Admin;