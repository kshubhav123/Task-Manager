import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/userSlice";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user.userData || state.user);
  const dispatch = useDispatch();
  const [showLinks, setShowLinks] = useState(false);

  const handleSignupOrTask = () => {
    if (token !== "") {
      navigate("/task");
    } else {
      navigate("/signup");
    }
  };

  const handleLoginOrLogout = () => {
    if (token !== "") {
      // Logout action
      sessionStorage.removeItem("userData");
      navigate("/");
      dispatch(setLogout());
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="navbar-container">
      <div className="logo" onClick={() => navigate("/")}>
        <span>Task Manager</span>
      </div>
      <button
        className="hamburger-menu"
        onClick={() => setShowLinks(!showLinks)}
      >
        {showLinks ? <FaTimes /> : <FaBars />}
      </button>
      <div className={showLinks ? "navbar-links show" : "navbar-links"}>
        <button className="navbar-buttons" onClick={handleSignupOrTask}>
          {token !== "" ? "Tasks" : "SignUp"}
        </button>

        <button className="navbar-buttons" onClick={handleLoginOrLogout}>
          {token !== "" ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
