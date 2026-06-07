import "./RestaurantDetails.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FoodCard from "../../components/FoodCard/FoodCard";
import Loader from "../../components/Loader/Loader";

function RestaurantDetails() {
  const { id } = useParams();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/fooditems/restaurant/${id}`
      );

      setFoods(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (foodItemId) => {
    try {
      await axios.post(
        `http://localhost:8080/api/cart?userId=${user.id}&foodItemId=${foodItemId}&quantity=1`
      );

      alert("Added to cart");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="restaurant-details">
      <h1>Menu</h1>

      <div className="foods-grid">
        {foods.map((item) => (
          <FoodCard
            key={item.id}
            item={item}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default RestaurantDetails;

