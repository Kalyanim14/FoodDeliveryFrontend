import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-left">
          <h1>
            Delicious Food Delivered To Your Doorstep
          </h1>

          <p>
            Order your favorite meals from top restaurants near you.
          </p>

          <Link to="/restaurants">
            <button>Explore Restaurants</button>
          </Link>
        </div>

        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
            alt="Food"
          />
        </div>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <h3>Fast Delivery</h3>
          <p>Get your food delivered quickly.</p>
        </div>

        <div className="feature-card">
          <h3>Top Restaurants</h3>
          <p>Choose from premium restaurants.</p>
        </div>

        <div className="feature-card">
          <h3>Best Quality</h3>
          <p>Fresh and hygienic food guaranteed.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;

