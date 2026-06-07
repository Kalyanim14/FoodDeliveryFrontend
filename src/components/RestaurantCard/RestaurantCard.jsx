import "./RestaurantCard.css";
import { Link } from "react-router-dom";

function RestaurantCard({ restaurant }) {
  return (
    <div className="restaurant-card">
      <img
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
        alt="Restaurant"
      />

      <div className="restaurant-content">
        <h3>{restaurant.name}</h3>

        <p>{restaurant.address}</p>

        <span>{restaurant.phone}</span>

        <Link to={`/restaurant/${restaurant.id}`}>
          <button>View Menu</button>
        </Link>
      </div>
    </div>
  );
}

export default RestaurantCard;

