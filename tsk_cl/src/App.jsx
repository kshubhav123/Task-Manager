import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Task from "./pages/Task";
import Home from "./pages/Home";
import { useEffect } from "react";
import { reload } from "./redux/userSlice";

function App() {
  const { token } = useSelector((state) => state.user.userData || state.user);
  const dispatch = useDispatch();

  const isAuthenticated = token !== "" ? true : false;

  useEffect(() => {
    dispatch(reload());
  }, [dispatch]);

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/task" />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/task"
          element={isAuthenticated ? <Task /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
