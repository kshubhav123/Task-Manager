import { useState } from "react";
import axios from "axios"; // Import Axios
import "../styles/TaskCard.css";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../redux/taskSlice";
import Badge from "./Badge";

const TaskCard = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data?.title);
  const [description, setDescription] = useState(data?.description);
  const [cardColor, setCardColor] = useState(data.cardColor);
  const [priority, setPriority] = useState(data.priority);
  const [completed, setCompleted] = useState(data.completed);

  const { token } = useSelector((state) => state.user.userData || state.user);

  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleColorChange = (e) => {
    setCardColor(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setCompleted(e.target.checked);
    // Send PUT request to update completion status
    axios
      .put(
        `http://localhost:8000/api/tasks/${data._id}`,
        { completed: e.target.checked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Task updated successfully:", response.data);
        dispatch(getTasks(token));
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const handleSubmit = () => {
    const taskData = {
      title: title,
      description: description,
      cardColor: cardColor,
      priority: priority,
    };

    // Set up the Axios PUT request
    axios
      .put(
        `http://localhost:8000/api/tasks/${data._id}`,
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Task updated successfully:", response.data);
        dispatch(getTasks(token));
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(
        `http://localhost:8000/api/tasks/${data._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Task Deleted successfully:", response.data);
        dispatch(getTasks(token));
      })
      .catch((error) => {
        console.error("Error in Delete task:", error);
      });
  };

  return (
    <div
      className={`taskCard-container ${isEditing ? "isEditing" : ""}`}
      style={{ backgroundColor: cardColor }}
    >
      <div className="taskCard-front" style={{ backgroundColor: cardColor }}>
        <Badge priority={priority}/>
        <div className="taskCard-title-ParentBox">
          <div className="taskCard-title">
            <span>{title}</span>
          </div>

          <div className="taskCard-titleCheckboxBox">
            <input
              type="checkbox"
              className="taskCard-titleCheckbox"
              checked={completed}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>
        <div className="taskCard-description">
          <span>{description}</span>
        </div>
        <div className="taskCard-buttonSection">
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>

      <div className="taskCard-back" style={{ backgroundColor: cardColor }}>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter title"
        />
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter description"
        />
        <div className="taskCard-back-SelectMenu">
          <h5>Priority </h5>
          <select value={priority} onChange={handlePriorityChange}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <h5>Card color</h5>
          <input type="color" onChange={handleColorChange} value={cardColor} />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default TaskCard;
