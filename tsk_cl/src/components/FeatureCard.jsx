import React from "react";
import "../styles/FeatureCard.css";

const FeatureCard = ({ title, description }) => {
  return (
    <div className="feature-card">
      <h3 className="feature-title">{title}</h3>
      <ul className="feature-list">
        {description.map((point, index) => {
          // Split the point at ":" to separate the part to be bold and normal text
          const [boldPart, normalPart] = point.split(":");
          return (
            <li key={index}>
              <strong>{boldPart.trim()}:</strong> {normalPart.trim()}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FeatureCard;
