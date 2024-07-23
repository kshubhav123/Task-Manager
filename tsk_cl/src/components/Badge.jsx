import React from "react";
import "../styles/Badge.css";

const Badge = ({ priority }) => {
  const badge = priority.toUpperCase();
  return (
    <div className="badge-container">
      <h5>{badge}</h5>
    </div>
  );
};

export default Badge;
