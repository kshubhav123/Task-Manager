import { useState } from "react";
import "../styles/Signup.css";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({}); // Initialize errors state
  const navigate = useNavigate();

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  const successNotify = () =>
    toast.success("😏 Account created successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  const errorNotify = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  const validateForm = () => {
    let valid = true;
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const postFormData = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/signup`,
        formData
      );

      if (response.status === 201) {
        console.log("Account created successfully");
        console.log(response.data);
        successNotify();
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        console.error("Error:", response.statusText);
        errorNotify("🫢 Something went wrong");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Email already exists
        errorNotify("🛑 Email already exists");
      } else {
        console.log(error);
        errorNotify("🫢 Something went wrong");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log(formData);
      postFormData();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="signup-container">
      <div className="signup-parentBox">
        <span className="signup-heading">Signup</span>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label className="signup-inputLabel">Full Name</label>
          <input
            type="text"
            name="name"
            className="signup-input"
            onChange={handleChange}
            value={formData.name}
            required
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
          <label className="signup-inputLabel">Email</label>
          <input
            type="email"
            name="email"
            className="signup-input"
            onChange={handleChange}
            value={formData.email}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
          <label className="signup-inputLabel">Password</label>
          <div className="signup-passwordBox">
            <input
              type={show ? "text" : "password"}
              name="password"
              className="signup-input"
              onChange={handleChange}
              value={formData.password}
              required
            />
            {show ? (
              <IoIosEye className="signup-password-eye" onClick={handleShow} />
            ) : (
              <IoIosEyeOff
                className="signup-password-eye"
                onClick={handleShow}
              />
            )}
          </div>
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          <span className="signup-bottomText">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </span>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </div>
    </div>
  );
};

export default Signup;
