import { useState } from "react";
import "../styles/Login.css";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../redux/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  const successNotify = () =>
    toast.success("😏 Login successful", {
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

  const errorNotify = () =>
    toast.error("🫢 Wrong credentials", {
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
        `http://localhost:8000/login`,
        formData
      );

      if (response.status === 200) {
        console.log("Login successful");
        console.log(response.data);
        successNotify();
        dispatch(setUserDetails(response.data));
        setTimeout(() => {
          navigate("/task");
        }, [2000]);
      } else {
        console.error("Error:", response.statusText);
        errorNotify();
      }
    } catch (error) {
      console.log(error);
      errorNotify();
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
    <div className="login-container">
      <div className="login-parentBox">
        <span className="login-heading">Login</span>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-inputLabel">Email</label>
          <input
            type="email"
            name="email"
            className="login-input"
            onChange={handleChange}
            value={formData.email}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <label className="login-inputLabel">Password</label>
          <div className="login-passwordBox">
            <input
              type={show ? "text" : "password"}
              name="password"
              className="login-input"
              onChange={handleChange}
              value={formData.password}
              required
            />
            {show ? (
              <IoIosEye className="login-password-eye" onClick={handleShow} />
            ) : (
              <IoIosEyeOff
                className="login-password-eye"
                onClick={handleShow}
              />
            )}
          </div>
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
          <button type="submit" className="login-button">
            Submit
          </button>
          <span className="login-bottomText">
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign Up</span>
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

export default Login;
