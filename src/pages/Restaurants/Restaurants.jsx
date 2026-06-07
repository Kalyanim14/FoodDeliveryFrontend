import "./Restaurants.css";
import axios from "axios";
import { useEffect, useState } from "react";

import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import Loader from "../../components/Loader/Loader";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/restaurants"
      );

      setRestaurants(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="restaurants-page">
      <h1>Restaurants</h1>

      <div className="restaurants-grid">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
          />
        ))}
      </div>
    </div>
  );
}

export default Restaurants;

