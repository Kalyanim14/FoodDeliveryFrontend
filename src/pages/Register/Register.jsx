import "./Register.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminRoute from "./components/AdminRoute/AdminRoute";

function Register() {
  const navigate = useNavigate();

    const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
    });



  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:8080/api/users/register",
        formData
      );

      navigate("/login");
    } catch (error) {
      alert("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          required
        />

        <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        >
        <option value="USER">
            User
        </option>

        <option value="ADMIN">
            Admin

        </option>
        </select>

        <button type="submit">
          {loading ? "Loading..." : "Register"}
        </button>

        <p>
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;

