import "./Navbar.css";

import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaHome,
  FaUtensils,
  FaClipboardList,
  FaUserShield
} from "react-icons/fa";
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
            <FaHome />
            <span> Home</span>
            </Link>
        </li>

        <li>
            <Link to="/restaurants">
            <FaUtensils />
            <span> Restaurants</span>
            </Link>
        </li>

        {user && (
            <>
            <li>
                <Link to="/orders">
                <FaClipboardList />
                <span> Orders</span>
                </Link>
            </li>

            <li>
                <Link to="/cart" >
                    <FaShoppingCart />
                    <span> Cart</span>
                </Link>
            </li>
            </>
        )}
        {user?.role === "ADMIN" && (
            <li>
            <Link to="/admin">
                <FaUserShield />
                <span> Admin</span>
            </Link>
            </li>
        )}
        </ul>
        <ul className="navbar-links">
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