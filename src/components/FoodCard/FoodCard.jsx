function FoodCard({ item, addToCart }) {
  return (
    <div className="food-card">
      <img
        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
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

