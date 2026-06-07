import './FoodCard.css';
import food from '../../assets/food.jpg';

function FoodCard({ item, addToCart }) {
  return (
    <div className="food-card">
      <img
        src={food}
        alt="Food"
      />

      <div className="food-content">
        <h3>{item.name}</h3>

        <p>{item.description}</p>

        <h4>₹ {item.price}</h4>

        <button onClick={() => addToCart(item.id)}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default FoodCard;

