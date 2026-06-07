import "./Navbar.css";

import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { user, logout } =
    useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          FoodieHub
        </Link>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">
            Home
          </Link>
        </li>

        <li>
          <Link to="/restaurants">
            Restaurants
          </Link>
        </li>

        {user && (
          <>
            <li>
              <Link to="/orders">
                Orders
              </Link>
            </li>

            <li>
              <Link
                to="/cart"
                className="cart-icon"
              >
                <FaShoppingCart />
              </Link>
            </li>
          </>
        )}

        {user?.role === "ADMIN" && (
          <li>
            <Link to="/admin">
              Admin
            </Link>
          </li>
        )}

        {user ? (
          <>
            <li className="welcome-text">
              Hi, {user.name}
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="logout-btn"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                Login
              </Link>
            </li>

            <li>
              <Link to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;