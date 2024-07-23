import { useState } from "react";
import axios from "axios";
import "../styles/TaskModal.css";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../redux/taskSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskModal = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cardColor, setCardColor] = useState("#ffd60a");
  const [priority, setPriority] = useState("high");

  const { token } = useSelector((state) => state.user.userData || state.user);
  const dispatch = useDispatch();

  const handleSave = () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Please enter both title and description.");
      return;
    }

    const taskData = { title, description, cardColor, priority };

    axios
      .post("http://localhost:8000/api/tasks/", taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Task saved successfully:", response.data);
        onSave(taskData);
        onClose();
        dispatch(getTasks(token));
      })
      .catch((error) => {
        console.error("Error saving task:", error);
        toast.error("Error saving task. Please try again.");
      });
  };

  return (
    <div className="task-modal">
      <ToastContainer />
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add New Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="color"
          value={cardColor}
          onChange={(e) => setCardColor(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default TaskModal;
